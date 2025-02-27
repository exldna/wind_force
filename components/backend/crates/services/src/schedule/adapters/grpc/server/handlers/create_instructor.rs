use thiserror::Error;

use crate::schedule::domain::model::instructor::*;

use proto::common::uuid::Uuid as UuidProto;
use proto::schedule::{
    CreateInstructorRequest as CreateInstructorRequestProto,
    CreateInstructorResponse as CreateInstructorResponseProto,
};

impl TryFrom<CreateInstructorRequestProto> for CreateInstructorRequest {
    type Error = CreateInstructorRequestParseError;

    fn try_from(proto: CreateInstructorRequestProto) -> Result<Self, Self::Error> {
        let instructor_name = InstructorName::from_raw(&proto.name)?;
        Ok(CreateInstructorRequest::new(instructor_name))
    }
}

#[derive(Debug, Error)]
pub enum CreateInstructorRequestParseError {
    #[error("failed to parse instructor name: {0}")]
    Name(#[from] InstructorNameEmptyError),
}

impl From<CreateInstructorRequestParseError> for tonic::Status {
    fn from(error: CreateInstructorRequestParseError) -> Self {
        tonic::Status::invalid_argument(error.to_string())
    }
}

impl From<Instructor> for CreateInstructorResponseProto {
    fn from(value: Instructor) -> Self {
        CreateInstructorResponseProto {
            uuid: Some(UuidProto::from(*value.id())),
        }
    }
}

impl From<CreateInstructorError> for tonic::Status {
    fn from(error: CreateInstructorError) -> Self {
        match error {
            CreateInstructorError::Internal(_) => {
                tonic::Status::internal("creating instructor failed due to internal error")
            }
        }
    }
}
