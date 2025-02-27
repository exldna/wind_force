use thiserror::Error;

use crate::schedule::domain::model::{event::*, time_span::*};

use proto::{
    common::uuid::Uuid as UuidProto,
    schedule::{
        CreateEventRequest as CreateEventRequestProto,
        CreateEventResponse as CreateEventResponseProto,
    },
};

impl TryFrom<CreateEventRequestProto> for CreateEventRequest {
    type Error = CreateEventRequestParseError;

    fn try_from(proto: CreateEventRequestProto) -> Result<Self, Self::Error> {
        let time_span = parse_time_span(&proto)?;
        let instructor = proto.instructor_uuid.map(|proto| proto.into());
        let product = proto.product_uuid.map(|proto| proto.into());
        Ok(CreateEventRequest::new(time_span, instructor, product))
    }
}

#[derive(Debug, Error)]
#[error("cannot parse CreateEventRequest: {0}")]
pub enum CreateEventRequestParseError {
    TimeSpan(#[from] TimeSpanParseError),
}

impl From<CreateEventRequestParseError> for tonic::Status {
    fn from(error: CreateEventRequestParseError) -> Self {
        tonic::Status::invalid_argument(error.to_string())
    }
}

#[derive(Debug, Error)]
pub enum TimeSpanParseError {
    #[error("invalid timestamp representation: {0}")]
    InvalidTimestamp(#[from] time::error::ComponentRange),
    #[error("invalid time span representation: {0}")]
    InvalidTimeSpan(#[from] InvalidTimeSpanError),
    #[error(transparent)]
    TimeSpan(#[from] CreateTimeSpanError),
}

#[derive(Debug, Error)]
#[error("either both ends must be specified, or both must be unspecified")]
pub struct InvalidTimeSpanError;

#[inline(always)]
fn parse_time_span(
    proto: &CreateEventRequestProto,
) -> Result<Option<TimeSpan>, TimeSpanParseError> {
    match (proto.time_begin, proto.time_end) {
        (Some(time_begin), Some(time_end)) => {
            let time_begin = time_begin.try_into()?;
            let time_end = time_end.try_into()?;
            Ok(Some(TimeSpan::from_ends(time_begin, time_end)?))
        }
        (None, None) => Ok(None),
        _ => Err(InvalidTimeSpanError.into()),
    }
}

impl From<Event> for CreateEventResponseProto {
    fn from(value: Event) -> Self {
        CreateEventResponseProto {
            uuid: Some(UuidProto::from(*value.id())),
        }
    }
}

impl From<CreateEventError> for tonic::Status {
    fn from(error: CreateEventError) -> Self {
        match error {
            CreateEventError::RelatedItemNotFound => {
                tonic::Status::failed_precondition(error.to_string())
            }
            CreateEventError::Internal(_) => {
                tonic::Status::internal("creating event failed due to internal error")
            }
        }
    }
}
