use thiserror::Error;

/// Represents the time period in witch the _event_ is planned.
///
/// [time] crate has nanoseconds precision, but in purposes of this library
/// we keep invariant that second and nanonsecond fields always equals 0.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct TimeSpan {
    /// When _event_ begins.
    time_begin: time::OffsetDateTime,

    /// When _event_ ends.
    time_end: time::OffsetDateTime,
}

impl TimeSpan {
    /// Creates new [TimeSpan] from it ends.
    ///
    /// # Errors
    /// - [CreateTimeSpanError::Empty] if `begin >= end`.
    /// - [CreateTimeSpanError::TimeInternal] if the times without nanoseconds
    ///     do not cover the range.
    ///
    /// # Examples
    /// ```
    /// # use services::schedule::domain::model::time_span::TimeSpan;
    /// #
    /// let begin = time::OffsetDateTime::now_utc();
    /// let end = begin + time::Duration::HOUR;
    /// assert!(TimeSpan::from_ends(begin, end).is_ok());
    /// assert!(TimeSpan::from_ends(end, begin).is_err());
    /// ```
    pub fn from_ends(
        mut begin: time::OffsetDateTime,
        mut end: time::OffsetDateTime,
    ) -> Result<Self, CreateTimeSpanError> {
        // just ignore seconds and nanoseconds.
        begin = begin.replace_second(0).map_err(anyhow::Error::from)?;
        begin = begin.replace_nanosecond(0).map_err(anyhow::Error::from)?;
        end = end.replace_second(0).map_err(anyhow::Error::from)?;
        end = end.replace_nanosecond(0).map_err(anyhow::Error::from)?;
        if begin >= end {
            return Err(EmptyTimeSpanError {}.into());
        }
        Ok(TimeSpan {
            time_begin: begin,
            time_end: end,
        })
    }

    /// Returns the beginning time point.
    pub fn begin(&self) -> time::OffsetDateTime {
        self.time_begin
    }

    /// Returns the enging time point.
    pub fn end(&self) -> time::OffsetDateTime {
        self.time_end
    }
}

#[derive(Debug, Error)]
#[error("time span cannot be empty")]
pub struct EmptyTimeSpanError;

#[derive(Debug, Error)]
#[error(transparent)]
pub enum CreateTimeSpanError {
    Empty(#[from] EmptyTimeSpanError),

    /// Time crate related errors.
    TimeInternal(#[from] anyhow::Error),
}
