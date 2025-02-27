use secrecy::SecretBox;

use crate::auth::domain::model::session::SessionToken;

/// # Common outbound hook that we can trust.
///
/// It represents a trusted location where we can generate sensitive data.
///
/// [services]: crate
pub trait TrustedSource: Send + Sync + 'static {
    /// Crypto-proof generation of random [Uuid].
    ///
    /// [Uuid]: uuid::Uuid
    fn generate_uuid(&self) -> uuid::Uuid;

    /// Crypto-proof generation of random [SessionToken].
    fn generate_session_token(&self) -> SecretBox<SessionToken>;
}
