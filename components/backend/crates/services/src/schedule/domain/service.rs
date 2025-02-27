use crate::trusted::domain::ports::TrustedSource;

use super::model::{event::*, instructor::*, product::*};
use super::ports::{ScheduleRepository, ScheduleService};

/// Canonical implementation of the [ScheduleService].
pub struct Service<R: ScheduleRepository, TS: TrustedSource> {
    trusted: TS,
    repository: R,
}

impl<R, TS> Service<R, TS>
where
    R: ScheduleRepository,
    TS: TrustedSource,
{
    pub fn new(trusted: TS, repository: R) -> Self {
        Service {
            trusted,
            repository,
        }
    }
}

impl<R, TS> ScheduleService for Service<R, TS>
where
    R: ScheduleRepository,
    TS: TrustedSource,
{
    async fn create_instructor(
        &self,
        request: CreateInstructorRequest,
    ) -> Result<Instructor, CreateInstructorError> {
        let uuid = self.trusted.generate_uuid();
        self.repository.create_instructor(uuid, &request).await?;
        let name = request.dissolve();
        Ok(Instructor::new(uuid, name))
    }

    async fn create_product(
        &self,
        request: CreateProductRequest,
    ) -> Result<Product, CreateProductError> {
        let uuid = self.trusted.generate_uuid();
        self.repository.create_product(uuid, &request).await?;
        let name = request.dissolve();
        Ok(Product::new(uuid, name))
    }

    async fn create_event(&self, request: CreateEventRequest) -> Result<Event, CreateEventError> {
        let uuid = self.trusted.generate_uuid();
        self.repository.create_event(uuid, &request).await?;
        let (time_span, instructor, product) = request.dissolve();
        Ok(Event::new(uuid, time_span, instructor, product))
    }
}
