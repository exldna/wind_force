use services::schedule::domain::model::{instructor, product, time_span};

mod instructor_model {
    use super::instructor::*;

    #[test]
    fn name_validation_test() -> Result<(), InstructorNameEmptyError> {
        let some_valid_name = InstructorName::from_raw("sir Isaac Newton");
        let trim_prefix = InstructorName::from_raw("   \nprefix trimmed");
        let trim_suffix = InstructorName::from_raw("suffix trimmed  \n ");
        let trim_string = InstructorName::from_raw("\t some    string\n\t  ");
        let empty_string_failed = InstructorName::from_raw("");
        let some_invalid_name_failed = InstructorName::from_raw("  \n\t");
        assert_eq!(some_valid_name?.as_str(), "sir Isaac Newton");
        assert_eq!(trim_prefix?.as_str(), "prefix trimmed");
        assert_eq!(trim_suffix?.as_str(), "suffix trimmed");
        assert_eq!(trim_string?.as_str(), "some    string");
        assert!(empty_string_failed.is_err());
        assert!(some_invalid_name_failed.is_err());
        Ok(())
    }
}

mod product_model {
    use super::product::*;

    #[test]
    fn name_validation_test() -> Result<(), ProductNameEmptyError> {
        let some_valid_name = ProductName::from_raw("long training");
        let trim_prefix = ProductName::from_raw("   \nprefix trimmed");
        let trim_suffix = ProductName::from_raw("suffix trimmed  \n ");
        let trim_string = ProductName::from_raw("\t some    string\n\t  ");
        let empty_string_failed = ProductName::from_raw("");
        let some_invalid_name_failed = ProductName::from_raw("  \n\t");
        assert_eq!(some_valid_name?.as_str(), "long training");
        assert_eq!(trim_prefix?.as_str(), "prefix trimmed");
        assert_eq!(trim_suffix?.as_str(), "suffix trimmed");
        assert_eq!(trim_string?.as_str(), "some    string");
        assert!(empty_string_failed.is_err());
        assert!(some_invalid_name_failed.is_err());
        Ok(())
    }
}

mod time_span_model {
    use super::time_span::*;

    #[test]
    fn time_span_creation_test() -> anyhow::Result<()> {
        let begin = time::OffsetDateTime::new_utc(
            time::Date::from_calendar_date(2000, time::Month::December, 3)?,
            time::Time::from_hms(10, 15, 20)?,
        );
        let end = time::OffsetDateTime::new_utc(
            time::Date::from_calendar_date(2001, time::Month::April, 3)?,
            time::Time::from_hms(10, 10, 20)?,
        );
        assert!(TimeSpan::from_ends(begin, end).is_ok());
        assert!(TimeSpan::from_ends(begin, begin).is_err());
        assert!(TimeSpan::from_ends(end, begin).is_err());
        Ok(())
    }

    #[test]
    fn time_span_precision_test() -> anyhow::Result<()> {
        let begin = time::OffsetDateTime::new_utc(
            time::Date::from_calendar_date(2000, time::Month::December, 3)?,
            time::Time::from_hms(10, 15, 20)?,
        );
        let begin_second = begin.replace_second(31)?;
        let end = time::OffsetDateTime::new_utc(
            time::Date::from_calendar_date(2001, time::Month::April, 3)?,
            time::Time::from_hms(10, 10, 20)?,
        );
        let end_nano = end.replace_nanosecond(12345)?;
        assert!(TimeSpan::from_ends(begin_second, begin).is_err());
        assert!(TimeSpan::from_ends(end, end_nano).is_err());
        assert_eq!(
            TimeSpan::from_ends(begin_second, end)?,
            TimeSpan::from_ends(begin, end_nano)?
        );
        Ok(())
    }
}
