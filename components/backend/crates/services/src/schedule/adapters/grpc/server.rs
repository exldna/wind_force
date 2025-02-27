use std::sync::Arc;

use crate::schedule::domain::ports::ScheduleService;

#[rustfmt::skip]
use proto::schedule::{
    schedule_server,
    CreateEventRequest,
    CreateEventResponse,
    CreateInstructorRequest,
    CreateInstructorResponse,
    CreateProductRequest,
    CreateProductResponse,
};

/// Consists the conversions between service internal types and public API.
mod handlers;

/// The service gRPC API implementation.
pub struct GrpcServer<SS: ScheduleService> {
    service: Arc<SS>,
}

impl<SS: ScheduleService> GrpcServer<SS> {
    /// Creates new gRPC service.
    pub fn new(service: Arc<SS>) -> Self {
        GrpcServer { service }
    }
}

#[tonic::async_trait]
impl<SS: ScheduleService> schedule_server::Schedule for GrpcServer<SS> {
    async fn create_event(
        &self,
        request: tonic::Request<CreateEventRequest>,
    ) -> tonic::Result<tonic::Response<CreateEventResponse>> {
        let request = request.into_inner().try_into()?;
        let response = self.service.create_event(request).await?;
        Ok(tonic::Response::new(response.into()))
    }

    async fn create_instructor(
        &self,
        request: tonic::Request<CreateInstructorRequest>,
    ) -> tonic::Result<tonic::Response<CreateInstructorResponse>> {
        let request = request.into_inner().try_into()?;
        let response = self.service.create_instructor(request).await?;
        Ok(tonic::Response::new(response.into()))
    }

    async fn create_product(
        &self,
        request: tonic::Request<CreateProductRequest>,
    ) -> tonic::Result<tonic::Response<CreateProductResponse>> {
        let request = request.into_inner().try_into()?;
        let response = self.service.create_product(request).await?;
        Ok(tonic::Response::new(response.into()))
    }
}
