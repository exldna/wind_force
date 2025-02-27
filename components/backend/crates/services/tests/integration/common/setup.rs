use tonic::transport::{Channel, Endpoint, Server, Uri};

use sqlx::sqlite::{SqliteConnectOptions, SqlitePool};

use proto::schedule::{schedule_client::ScheduleClient, schedule_server::ScheduleServer};

use services::schedule::{
    adapters::{grpc::server::GrpcServer, sqlite::repository::SqliteRepository},
    domain::service::Service,
};

use services::trusted::adapters::secure::TrustedLocation;

pub async fn setup_default() -> anyhow::Result<ScheduleClient<Channel>> {
    setup(Config::default()).await
}

pub async fn setup(config: Config) -> anyhow::Result<ScheduleClient<Channel>> {
    let (client, server) = tokio::io::duplex(1024);

    let sqlite_options = SqliteConnectOptions::new()
        .in_memory(true)
        .foreign_keys(true);
    let sqlite = SqlitePool::connect_lazy_with(sqlite_options);
    if config.repository {
        migrate::run(&sqlite).await?;
    }

    let trusted = TrustedLocation::new();

    let schedule_service = {
        let repository = SqliteRepository::new(sqlite.clone());
        let service = Service::new(trusted.clone(), repository);
        let grpc_server = GrpcServer::new(std::sync::Arc::new(service));
        ScheduleServer::new(grpc_server)
    };

    tokio::spawn(async move {
        let stream = tokio_stream::once(Ok::<_, std::io::Error>(server));
        Server::builder()
            .add_service(schedule_service)
            .serve_with_incoming(stream)
            .await
    });

    let mut client = Some(client);
    let channel = Endpoint::try_from("http://[::]:50051")?
        .connect_with_connector(tower::service_fn(move |_: Uri| {
            let client = client.take();

            async move {
                if let Some(client) = client {
                    Ok(hyper_util::rt::TokioIo::new(client))
                } else {
                    Err(std::io::Error::other("Client already taken"))
                }
            }
        }))
        .await?;

    let client = ScheduleClient::new(channel);

    Ok(client)
}

#[derive(Debug, Clone)]
pub struct Config {
    /// Do repository setup or not.
    pub repository: bool,
}

impl Default for Config {
    fn default() -> Self {
        Config { repository: true }
    }
}
