//! `common.types.Timestamp` proto conversion.

/// `common.types.Timestamp` definition.
pub use super::types::Timestamp;

impl From<time::OffsetDateTime> for Timestamp {
    fn from(value: time::OffsetDateTime) -> Self {
        Timestamp {
            timestamp: value.unix_timestamp(),
        }
    }
}

impl TryInto<time::OffsetDateTime> for Timestamp {
    type Error = time::error::ComponentRange;

    fn try_into(self) -> Result<time::OffsetDateTime, Self::Error> {
        time::OffsetDateTime::from_unix_timestamp(self.timestamp)
    }
}
