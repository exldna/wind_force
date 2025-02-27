use rand::{
    distr::{Alphanumeric, SampleString},
    RngCore,
};
use secrecy::{
    zeroize::{Zeroize, ZeroizeOnDrop},
    SecretBox,
};

/// Used to determine different user sessions.
#[derive(Clone, PartialEq, Eq, Default)]
pub struct SessionToken(String);

impl SessionToken {
    pub const LENGTH: usize = 32;

    /// Creates new secret containing random [SessionToken].
    ///
    /// # Examples
    /// ```
    /// # use rand::SeedableRng;
    /// # use services::auth::domain::model::session::*;
    /// # let rng = &mut rand_hc::Hc128Rng::from_seed([0u8; 32]);
    /// let secret = SessionToken::with_rng_secure(rng);
    /// ```
    pub fn with_rng_secure(rng: &mut dyn RngCore) -> SecretBox<SessionToken> {
        SecretBox::init_with_mut(|token: &mut SessionToken| {
            *token = SessionToken(Alphanumeric.sample_string(rng, Self::LENGTH));
        })
    }
}

impl Zeroize for SessionToken {
    fn zeroize(&mut self) {
        self.0.zeroize();
    }
}

impl ZeroizeOnDrop for SessionToken {}

impl Drop for SessionToken {
    fn drop(&mut self) {
        self.zeroize();
    }
}
