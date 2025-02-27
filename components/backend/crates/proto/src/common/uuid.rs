//! `common.types.Uuid` proto conversion.

/// `common.types.Uuid` definition.
pub use super::types::Uuid;

impl From<uuid::Uuid> for Uuid {
    fn from(value: uuid::Uuid) -> Self {
        let (low, high) = value.as_u64_pair();
        Uuid { low, high }
    }
}

impl Into<uuid::Uuid> for Uuid {
    fn into(self) -> uuid::Uuid {
        uuid::Uuid::from_u64_pair(self.low, self.high)
    }
}
