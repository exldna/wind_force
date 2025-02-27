use proto::common::{time as time_proto, uuid as uuid_proto};

#[test]
fn uuid_to_proto_and_back() {
    let expected = uuid::Uuid::now_v7();
    let proto = uuid_proto::Uuid::from(expected);
    let result: uuid::Uuid = proto.into();
    assert_eq!(expected, result);
}

#[test]
fn timestamp_to_proto_and_back() {
    let expected = time::OffsetDateTime::now_utc();
    // We dont care about nanoseconds. So just assume that nanos always 0.
    let expected = expected.replace_nanosecond(0).unwrap();
    let proto = time_proto::Timestamp::from(expected);
    let result: Result<time::OffsetDateTime, _> = proto.try_into();
    assert_eq!(Ok(expected), result);
}
