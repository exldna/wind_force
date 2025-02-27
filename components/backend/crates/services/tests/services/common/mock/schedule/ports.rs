use std::future::Future;

use services::schedule::domain;
use services::schedule::domain::model::{event::*, instructor::*, product::*};

use async_trait::async_trait;

mockall::mock! {
    pub ScheduleRepository{}

    #[async_trait]
    impl domain::ports::ScheduleRepository for ScheduleRepository {
        fn create_event(
            &self,
            id: EventId,
            request: &CreateEventRequest,
        ) -> impl Future<Output = Result<(), CreateEventError>> + Send;

        fn create_product(
            &self,
            id: ProductId,
            request: &CreateProductRequest,
        ) -> impl Future<Output = Result<(), CreateProductError>> + Send;

        fn create_instructor(
            &self,
            id: InstructorId,
            request: &CreateInstructorRequest,
        ) -> impl Future<Output = Result<(), CreateInstructorError>> + Send;
    }
}
