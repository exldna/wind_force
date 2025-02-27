use proto::{common::time::Timestamp, schedule::*};

use crate::common::setup;

#[tokio::test]
async fn create_event() -> anyhow::Result<()> {
    let mut client = setup::setup_default().await?;
    let instructor_uuid = {
        let response = client
            .create_instructor(CreateInstructorRequest {
                name: "sir Isaac Newton".to_owned(),
            })
            .await?;
        response.into_inner().uuid
    };
    let product_uuid = {
        let response = client
            .create_product(CreateProductRequest {
                name: "training".to_owned(),
            })
            .await?;
        response.into_inner().uuid
    };
    client
        .create_event(CreateEventRequest {
            instructor_uuid,
            product_uuid,
            ..Default::default()
        })
        .await?;
    Ok(())
}

#[tokio::test]
async fn create_event_with_invalid_time_span() -> anyhow::Result<()> {
    let mut client = setup::setup(setup::Config { repository: false }).await?;
    let begin = Timestamp::from(time::OffsetDateTime::now_utc());
    let end = Timestamp::from(time::OffsetDateTime::now_utc() + time::Duration::HOUR);
    // --------------------------------------------------
    let error = client
        .create_event(CreateEventRequest {
            time_begin: None,
            time_end: Some(end),
            ..Default::default()
        })
        .await
        .expect_err(
            "unexpected behavior:
            either both ends must be specified, or both must be unspecified",
        );
    match error.code() {
        tonic::Code::InvalidArgument => (),
        _ => anyhow::bail!("tonic::Code::InvalidArgument was expected"),
    }
    // --------------------------------------------------
    let error = client
        .create_event(CreateEventRequest {
            time_begin: Some(end),
            time_end: Some(begin),
            ..Default::default()
        })
        .await
        .expect_err("unexpected behavior: time span cannot be empty");
    match error.code() {
        tonic::Code::InvalidArgument => (),
        _ => anyhow::bail!("tonic::Code::InvalidArgument was expected"),
    }
    // --------------------------------------------------
    Ok(())
}

#[tokio::test]
async fn create_product_duplicate() -> anyhow::Result<()> {
    let mut client = setup::setup_default().await?;
    let product_name = "journey".to_owned();
    let _product_uuid = {
        let response = client
            .create_product(CreateProductRequest {
                name: product_name.clone(),
            })
            .await?;
        response.into_inner().uuid
    };
    let error = client
        .create_product(CreateProductRequest {
            name: product_name.clone(),
        })
        .await
        .expect_err("unexpected behavior: product names must be unique");
    match error.code() {
        tonic::Code::AlreadyExists => (),
        _ => anyhow::bail!("tonic::Code::AlreadyExists was expected"),
    };
    Ok(())
}
