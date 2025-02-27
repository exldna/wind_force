use std::future::Future;

use super::model::{event::*, instructor::*, product::*};

/// Public API for the schedule domain.
pub trait ScheduleService: Send + Sync + 'static {
    /// Create new [Instructor].
    fn create_instructor(
        &self,
        request: CreateInstructorRequest,
    ) -> impl Future<Output = Result<Instructor, CreateInstructorError>> + Send;

    /// Create new [Product].
    ///
    /// # Errors
    /// - [CreateProductError::AlreadyExists] if a product with the same name already exists.
    fn create_product(
        &self,
        request: CreateProductRequest,
    ) -> impl Future<Output = Result<Product, CreateProductError>> + Send;

    /// Create new [Event].
    ///
    /// # Errors
    /// - [CreateEventError::RelatedItemNotFound] if instructor or product with given id not found.
    fn create_event(
        &self,
        request: CreateEventRequest,
    ) -> impl Future<Output = Result<Event, CreateEventError>> + Send;
}

/// Represents a schedule data storage.
pub trait ScheduleRepository: Send + Sync + 'static {
    /// Persist a new [Instructor] with given [InstructorId].
    fn create_instructor(
        &self,
        id: InstructorId,
        request: &CreateInstructorRequest,
    ) -> impl Future<Output = Result<(), CreateInstructorError>> + Send;

    /// Persist a new [Product].
    ///
    /// # Errors
    /// - MUST return [CreateProductError::AlreadyExists]
    ///     if a product with the same name already exists.
    fn create_product(
        &self,
        id: ProductId,
        request: &CreateProductRequest,
    ) -> impl Future<Output = Result<(), CreateProductError>> + Send;

    /// Persist a new [Event].
    ///
    /// # Errors
    /// - MUST return [CreateEventError::RelatedItemNotFound]
    ///     if instructor or product with given id are not exist.
    fn create_event(
        &self,
        id: EventId,
        request: &CreateEventRequest,
    ) -> impl Future<Output = Result<(), CreateEventError>> + Send;
}
