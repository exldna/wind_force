use services::schedule::domain::{
    model::{event::*, instructor::*, product::*, time_span::*},
    ports::ScheduleService,
    service::Service,
};

use crate::common::mock::{schedule::ports::*, trusted::MockTrustedSource};

#[tokio::test]
async fn create_event() -> anyhow::Result<()> {
    let event_id = EventId::now_v7();
    let time_span = {
        let end = time::OffsetDateTime::now_utc();
        let begin = end - time::Duration::HOUR;
        TimeSpan::from_ends(begin, end)?
    };
    let instructor_id = InstructorId::now_v7();
    let product_id = ProductId::now_v7();
    let mut trusted = MockTrustedSource::new();
    trusted.expect_generate_uuid().return_once(move || event_id);
    let mut repository = MockScheduleRepository::new();
    repository.expect_create_event().return_once(
        move |id: EventId, _request: &CreateEventRequest| {
            assert_eq!(event_id, id);
            Box::pin(async move { Ok(()) })
        },
    );
    let service = Service::new(trusted, repository);
    let request = CreateEventRequest::new(
        Some(time_span.clone()),
        Some(instructor_id),
        Some(product_id),
    );
    let event = service.create_event(request).await?;
    assert_eq!(*event.id(), event_id);
    assert_eq!(*event.time_span(), Some(time_span));
    assert_eq!(*event.instructor(), Some(instructor_id));
    assert_eq!(*event.product(), Some(product_id));
    Ok(())
}

#[tokio::test]
async fn create_event_without_metadata() -> anyhow::Result<()> {
    let event_id = EventId::now_v7();
    let mut trusted = MockTrustedSource::new();
    trusted.expect_generate_uuid().return_once(move || event_id);
    let mut repository = MockScheduleRepository::new();
    repository.expect_create_event().return_once(
        move |id: EventId, _request: &CreateEventRequest| {
            assert_eq!(id, event_id);
            Box::pin(async move { Ok(()) })
        },
    );
    let service = Service::new(trusted, repository);
    let request = CreateEventRequest::new(None, None, None);
    let event = service.create_event(request).await?;
    assert_eq!(*event.id(), event_id);
    assert_eq!(*event.time_span(), None);
    assert_eq!(*event.instructor(), None);
    assert_eq!(*event.product(), None);
    Ok(())
}

#[tokio::test]
async fn create_event_failure_related_not_found() -> anyhow::Result<()> {
    let event_id = EventId::now_v7();
    let instructor_id = InstructorId::now_v7();
    let mut trusted = MockTrustedSource::new();
    trusted.expect_generate_uuid().return_once(move || event_id);
    let mut repsitory = MockScheduleRepository::new();
    repsitory.expect_create_event().return_once(
        move |_id: EventId, request: &CreateEventRequest| {
            let req_instructor = request.instructor().clone();
            Box::pin(async move {
                if req_instructor == Some(instructor_id) {
                    Err(CreateEventError::RelatedItemNotFound)
                } else {
                    Ok(())
                }
            })
        },
    );
    let service = Service::new(trusted, repsitory);
    let request = CreateEventRequest::new(None, Some(instructor_id), None);
    let error = service.create_event(request).await.unwrap_err();
    match error {
        CreateEventError::RelatedItemNotFound => Ok(()),
        _ => anyhow::bail!("expected `CreateEventError::RelatedItemNotFound`, but got: {error}"),
    }
}

#[tokio::test]
async fn create_instructor() -> anyhow::Result<()> {
    let instructor_id = InstructorId::now_v7();
    let instructor_name = InstructorName::from_raw("sir Isaac Newton")?;
    let mut trusted = MockTrustedSource::new();
    trusted
        .expect_generate_uuid()
        .return_once(move || instructor_id);
    let mut repository = MockScheduleRepository::new();
    repository.expect_create_instructor().return_once(
        move |id: InstructorId, _request: &CreateInstructorRequest| {
            assert_eq!(id, instructor_id);
            Box::pin(async move { Ok(()) })
        },
    );
    let service = Service::new(trusted, repository);
    let request = CreateInstructorRequest::new(instructor_name.clone());
    let instructor = service.create_instructor(request).await?;
    assert_eq!(*instructor.id(), instructor_id);
    assert_eq!(*instructor.name(), instructor_name);
    Ok(())
}

#[tokio::test]
async fn create_product() -> anyhow::Result<()> {
    let product_id = ProductId::now_v7();
    let product_name = ProductName::from_raw("training")?;
    let mut trusted = MockTrustedSource::new();
    trusted
        .expect_generate_uuid()
        .return_once(move || product_id);
    let mut repository = MockScheduleRepository::new();
    repository.expect_create_product().return_once(
        move |id: ProductId, _request: &CreateProductRequest| {
            assert_eq!(id, product_id);
            Box::pin(async move { Ok(()) })
        },
    );
    let service = Service::new(trusted, repository);
    let request = CreateProductRequest::new(product_name.clone());
    let product = service.create_product(request).await?;
    assert_eq!(*product.id(), product_id);
    assert_eq!(*product.name(), product_name);
    Ok(())
}

#[tokio::test]
async fn create_product_failure_already_exists() -> anyhow::Result<()> {
    let product_id = ProductId::now_v7();
    let product_name = ProductName::from_raw("training")?;
    let mut trusted = MockTrustedSource::new();
    trusted
        .expect_generate_uuid()
        .return_once(move || product_id);
    let mut repository = MockScheduleRepository::new();
    repository.expect_create_product().return_once(
        move |_id: ProductId, request: &CreateProductRequest| {
            let product_name = (*request.name()).clone();
            Box::pin(async move { Err(CreateProductError::AlreadyExists(product_name)) })
        },
    );
    let service = Service::new(trusted, repository);
    let request = CreateProductRequest::new(product_name.clone());
    let error = service.create_product(request).await.unwrap_err();
    match error {
        CreateProductError::AlreadyExists(result_name) => {
            assert_eq!(product_name, result_name);
            Ok(())
        }
        _ => {
            anyhow::bail!("expected `CreateProductError::AlreadyExists`, but got: {error}")
        }
    }
}
