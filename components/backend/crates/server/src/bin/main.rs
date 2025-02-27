use server::config::ServerConfig;
use sqlx::SqlitePool;

use services::trusted::adapters::secure::TrustedLocation;

use proto::schedule::schedule_server::ScheduleServer;
use services::schedule::adapters::grpc::server::GrpcServer;
use services::schedule::adapters::sqlite::repository::SqliteRepository;
use services::schedule::domain::service::Service;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let config = ServerConfig::from_env()?;
    let sqlite = SqlitePool::connect_with(config.sqlite_options).await?;
    let trusted = TrustedLocation::new();
    let schedule_service = {
        let repository = SqliteRepository::new(sqlite.clone());
        let service = Service::new(trusted.clone(), repository);
        let grpc_server = GrpcServer::new(std::sync::Arc::new(service));
        ScheduleServer::new(grpc_server)
    };
    tonic::transport::Server::builder()
        .add_service(schedule_service)
        .serve(config.serve_addr)
        .await?;
    Ok(())
}
