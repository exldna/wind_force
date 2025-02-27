use std::future::Future;

use super::model::{auth::*, session::*};

/// Auth service public API.
pub trait AuthService: Send + Sync + 'static {
    /// Authenticate the user with the given credentials.
    ///
    /// # Errors
    /// - TODO:
    fn authenticate(
        &self,
        request: AuthenticationRequest,
    ) -> impl Future<Output = Result<SessionToken, AuthenticationError>> + Send;

    /// Authorize request with given [SessionToken].
    ///
    /// # Errors
    /// - TODO:
    fn authorize(
        &self,
        token: SessionToken,
    ) -> impl Future<Output = Result<AuthorizationResponse, AuthorizationError>> + Send;
}

/// TODO:
pub trait SessionsRepository {
    /// TODO:
    fn create_session(&self);

    /// TODO:
    fn delete_session(&self);

    /// TODO:
    fn verify_token(&self);
}

pub trait CredentialsRepository {

}
