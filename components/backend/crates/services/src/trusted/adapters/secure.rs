use crate::auth::domain::model::session::SessionToken;
use crate::trusted::domain::ports::TrustedSource;

use rand::{RngCore, SeedableRng};
use rand_hc::Hc128Rng;

use secrecy::{
    zeroize::{Zeroize, ZeroizeOnDrop},
    ExposeSecretMut, SecretBox,
};

use std::sync::{Arc, Mutex};

/// Secure implementation of the [TrustedSource].
#[derive(Clone)]
pub struct TrustedLocation {
    inner: Arc<Mutex<TrustedLocationInner>>,
}

impl TrustedLocation {
    /// Creates new [TrustedLocation].
    pub fn new() -> Self {
        TrustedLocation {
            inner: Arc::new(Mutex::new(TrustedLocationInner::new())),
        }
    }
}

impl TrustedSource for TrustedLocation {
    fn generate_uuid(&self) -> uuid::Uuid {
        let mut inner = self.inner.lock().unwrap();
        inner.generate_uuid()
    }

    fn generate_session_token(&self) -> SecretBox<SessionToken> {
        let mut inner = self.inner.lock().unwrap();
        inner.generate_session_token()
    }
}

struct TrustedLocationInner {
    secure_rng: SecretBox<TrustedRng>,
}

impl TrustedLocationInner {
    fn new() -> Self {
        let secure_rng = TrustedRng::new_secure();
        TrustedLocationInner { secure_rng }
    }

    fn get_rng(&mut self) -> &mut dyn RngCore {
        let rng = self.secure_rng.expose_secret_mut();
        // IMPLEMENTATION SAFETY:
        // We assume that the `zeroize` on the `rng` will be called after all its uses.
        rng.0.as_mut().unwrap()
    }
}

/// Actual implementation of [TrustedSource] methods.
impl TrustedLocationInner {
    fn generate_uuid(&mut self) -> uuid::Uuid {
        let random_bytes = {
            let mut random_bytes = [0u8; 10];
            self.get_rng().fill_bytes(&mut random_bytes);
            random_bytes
        };
        let millis = {
            let ts = time::OffsetDateTime::now_utc() - time::OffsetDateTime::UNIX_EPOCH;
            ts.whole_milliseconds() as u64
        };
        let builder = uuid::Builder::from_unix_timestamp_millis(millis, &random_bytes);
        builder.into_uuid()
    }

    fn generate_session_token(&mut self) -> SecretBox<SessionToken> {
        SessionToken::with_rng_secure(self.get_rng())
    }
}

struct TrustedRng(Option<Hc128Rng>);

impl TrustedRng {
    fn new_secure() -> SecretBox<TrustedRng> {
        SecretBox::init_with_mut(|rng: &mut TrustedRng| {
            *rng = TrustedRng(Some(Hc128Rng::from_os_rng()));
        })
    }
}

impl Default for TrustedRng {
    fn default() -> Self {
        TrustedRng(None)
    }
}

impl Zeroize for TrustedRng {
    fn zeroize(&mut self) {
        self.0 = None
    }
}

impl Drop for TrustedRng {
    fn drop(&mut self) {
        self.zeroize();
    }
}

impl ZeroizeOnDrop for TrustedRng {}
