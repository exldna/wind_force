use secrecy::SecretBox;

use services::auth::domain::model::session::SessionToken;

use services::trusted;

mockall::mock! {
    pub TrustedSource {}

    impl trusted::domain::ports::TrustedSource for TrustedSource {
        fn generate_uuid(&self) -> uuid::Uuid;

        fn generate_session_token(&self) -> SecretBox<SessionToken>;
    }
}
