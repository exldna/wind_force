use thiserror::Error;

use crate::schedule::domain::model::product::*;

use proto::common::uuid::Uuid as UuidProto;
use proto::schedule::{
    CreateProductRequest as CreateInstructorRequestProto,
    CreateProductResponse as CreateProductResponseProto,
};

impl TryFrom<CreateInstructorRequestProto> for CreateProductRequest {
    type Error = CreateProductRequestParseError;

    fn try_from(proto: CreateInstructorRequestProto) -> Result<Self, Self::Error> {
        let product_name = ProductName::from_raw(&proto.name)?;
        Ok(CreateProductRequest::new(product_name))
    }
}

#[derive(Debug, Error)]
pub enum CreateProductRequestParseError {
    #[error("failed to parse product name: {0}")]
    Name(#[from] ProductNameEmptyError),
}

impl From<CreateProductRequestParseError> for tonic::Status {
    fn from(error: CreateProductRequestParseError) -> Self {
        tonic::Status::invalid_argument(error.to_string())
    }
}

impl From<Product> for CreateProductResponseProto {
    fn from(value: Product) -> Self {
        CreateProductResponseProto {
            uuid: Some(UuidProto::from(*value.id())),
        }
    }
}

impl From<CreateProductError> for tonic::Status {
    fn from(error: CreateProductError) -> Self {
        match error {
            CreateProductError::AlreadyExists(_) => {
                tonic::Status::already_exists(error.to_string())
            }
            CreateProductError::Internal(_) => {
                tonic::Status::internal("failed to create product due to internal error")
            }
        }
    }
}
