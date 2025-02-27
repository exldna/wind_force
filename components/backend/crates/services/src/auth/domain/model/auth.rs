use thiserror::Error;

use super::credentials::*;

#[allow(dead_code)]
pub struct AuthenticationRequest {
    login: Login,
    password: Password,
}

#[derive(Debug, Error)]
pub enum AuthenticationError {
    #[error("invalid login or password")]
    InvalidCredentials,
    #[error(transparent)]
    Internal(#[from] anyhow::Error),
}

#[derive(Debug, Clone, Copy)]
pub enum AuthorizationResponse {
    /// Authorization successful.
    Success,
    /// Authorization request denied.
    AccessDenied,
}

#[derive(Debug, Error)]
pub enum AuthorizationError {
    #[error(transparent)]
    Internal(#[from] anyhow::Error),
}
