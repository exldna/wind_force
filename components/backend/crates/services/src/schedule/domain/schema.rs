use sea_query::Iden;

/// Instructors table.
///
/// # Restrictions
/// - _Primary key_ - [Products::Uuid]
pub enum Instructors {
    Table,
    Uuid,
    Name,
}

impl Iden for Instructors {
    fn unquoted(&self, s: &mut dyn std::fmt::Write) {
        write!(
            s,
            "{}",
            match self {
                Self::Table => "instructors",
                Self::Uuid => "uuid",
                Self::Name => "name",
            }
        )
        .unwrap();
    }
}

/// Products table.
///
/// # Restrictions
/// - _Primary key_ - [Products::Uuid]
/// - [Products::Name]s are unique.
pub enum Products {
    Table,
    Uuid,
    Name,
}

impl Iden for Products {
    fn unquoted(&self, s: &mut dyn std::fmt::Write) {
        write!(
            s,
            "{}",
            match self {
                Self::Table => "products",
                Self::Uuid => "uuid",
                Self::Name => "name",
            }
        )
        .unwrap();
    }
}

/// Events table.
///
/// # Restrictions
/// - _Primary key_ - [Events::Uuid]
/// - [Events::TimeBegin] and [Events::TimeEnd] both defined or both _Null_
/// - If [Events::TimeBegin] and [Events::TimeEnd] are defined,
///     then [Events::TimeBegin] < [Events::TimeEnd]
/// - [Events::Product] is _Null_ or refers to [Products::Uuid]
/// - [Events::Instructor] is _Null_ or refers to [Instructors::Uuid]
pub enum Events {
    Table,
    Uuid,
    TimeBegin,
    TimeEnd,
    Product,
    Instructor,
}

impl Iden for Events {
    fn unquoted(&self, s: &mut dyn std::fmt::Write) {
        write!(
            s,
            "{}",
            match self {
                Self::Table => "events",
                Self::Uuid => "uuid",
                Self::TimeBegin => "time_begin",
                Self::TimeEnd => "time_end",
                Self::Product => "product",
                Self::Instructor => "instructor",
            }
        )
        .unwrap();
    }
}
