use derive_getters::{Dissolve, Getters};
use thiserror::Error;

/// People who work with students.
#[derive(Clone, Debug, Getters)]
pub struct Instructor {
    /// [Instructor] unique identifier.
    ///
    /// We use it to distinguish two different instructors.
    id: InstructorId,

    /// Instructor public name.
    name: InstructorName,
}

impl Instructor {
    /// Creates new [Instructor].
    pub const fn new(id: InstructorId, name: InstructorName) -> Self {
        Instructor { id, name }
    }
}

impl PartialEq for Instructor {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

/// [Instructor] unique identifier.
///
/// We use _UUIDs_ as [Instructor]s identifiers.
pub type InstructorId = uuid::Uuid;

/// A valid instructor name.
///
/// Mostly instructors are free to choose their own names.
/// However, names cannot be empty or consist only of whitespace.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct InstructorName(String);

#[derive(Debug, Error)]
#[error("instructor name cannot be empty")]
pub struct InstructorNameEmptyError;

impl InstructorName {
    /// Creates new [InstructorName] from string.
    ///
    /// # Errors
    /// - [InstructorNameEmptyError] if given string is empty or consists only of whitespace.
    ///
    /// # Examples
    /// ```
    /// # use services::schedule::domain::model::instructor::InstructorName;
    /// #
    /// assert!(InstructorName::from_raw("sir Isaac Newton").is_ok());
    /// assert!(InstructorName::from_raw("").is_err());
    /// assert!(InstructorName::from_raw(" \n\t").is_err());
    /// ```
    pub fn from_raw(raw: &str) -> Result<Self, InstructorNameEmptyError> {
        let trimmed = raw.trim();
        if trimmed.is_empty() {
            return Err(InstructorNameEmptyError {});
        }
        Ok(InstructorName {
            0: trimmed.to_string(),
        })
    }

    /// Returns reference to valid name.
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl std::fmt::Display for InstructorName {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(&self.0)
    }
}

#[derive(Clone, Debug, Getters, Dissolve)]
pub struct CreateInstructorRequest {
    name: InstructorName,
}

impl CreateInstructorRequest {
    pub const fn new(name: InstructorName) -> Self {
        CreateInstructorRequest { name }
    }
}

#[derive(Debug, Error)]
pub enum CreateInstructorError {
    #[error(transparent)]
    Internal(#[from] anyhow::Error),
}
