use derive_getters::{Dissolve, Getters};
use thiserror::Error;

use super::instructor::InstructorId;
use super::product::ProductId;
use super::time_span::TimeSpan;

/// Represents the schedule item.
#[derive(Clone, Debug, Getters)]
pub struct Event {
    /// [Event] unique identifier.
    ///
    /// We use it to distinguish two different events.
    id: EventId,

    /// _Time span_ in which the _event_ is planned.
    time_span: Option<TimeSpan>,

    /// The instructor assigned to the event.
    instructor: Option<InstructorId>,

    /// The work that the instructor have to do.
    product: Option<ProductId>,
}

impl Event {
    /// Creates new [Event].
    pub const fn new(
        id: EventId,
        time_span: Option<TimeSpan>,
        instructor: Option<InstructorId>,
        product: Option<ProductId>,
    ) -> Self {
        Event {
            id,
            time_span,
            instructor,
            product,
        }
    }
}

impl PartialEq for Event {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

/// [Event] unique identifier.
///
/// We use _UUIDs_ as [Event]s identifiers.
pub type EventId = uuid::Uuid;

#[derive(Clone, Debug, Getters, Dissolve)]
pub struct CreateEventRequest {
    time_span: Option<TimeSpan>,
    instructor: Option<InstructorId>,
    product: Option<ProductId>,
}

impl CreateEventRequest {
    pub fn new(
        time_span: Option<TimeSpan>,
        instructor: Option<InstructorId>,
        product: Option<ProductId>,
    ) -> Self {
        CreateEventRequest {
            time_span,
            instructor,
            product,
        }
    }
}

#[derive(Debug, Error)]
pub enum CreateEventError {
    #[error("event creation failed because the related item was not found")]
    RelatedItemNotFound,
    #[error(transparent)]
    Internal(#[from] anyhow::Error),
}
