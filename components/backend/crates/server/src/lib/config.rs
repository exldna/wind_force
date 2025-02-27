//! Server configuration parameters.

use sqlx::sqlite::SqliteConnectOptions;
use std::net::SocketAddr;

#[derive(Debug, Clone)]
pub struct ServerConfig {
    /// SQlite connect options.
    pub sqlite_options: SqliteConnectOptions,
    /// Serve address.
    pub serve_addr: SocketAddr,
}

impl ServerConfig {
    /// Create new [ServerConfig] from environment vriables.
    pub fn from_env() -> anyhow::Result<ServerConfig> {
        let serve_addr = "[::1]:50051".parse()?;
        let sqlite_options = SqliteConnectOptions::new()
            .in_memory(true)
            .foreign_keys(true);
        Ok(ServerConfig {
            sqlite_options,
            serve_addr,
        })
    }
}
