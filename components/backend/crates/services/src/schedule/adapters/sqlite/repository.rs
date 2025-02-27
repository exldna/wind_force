use crate::schedule::domain::model::{event::*, instructor::*, product::*};
use crate::schedule::domain::ports::ScheduleRepository;
use crate::schedule::domain::schema;

use sea_query::{Query, SqliteQueryBuilder};
use sea_query_binder::SqlxBinder;
use sqlx::sqlite::SqlitePool;

/// Schedule service repository implementation for sqlite databse.
pub struct SqliteRepository {
    pool: SqlitePool,
}

impl SqliteRepository {
    /// Creates new [SqliteRepository].
    pub fn new(pool: SqlitePool) -> Self {
        SqliteRepository { pool }
    }
}

/// Note: We assume that UUIDs cannot overlap. But if this happens,
/// there is a guarantee that an unspecified error will be returned.
impl ScheduleRepository for SqliteRepository {
    async fn create_event(
        &self,
        event_uuid: EventId,
        request: &CreateEventRequest,
    ) -> Result<(), CreateEventError> {
        let time_begin = request.time_span().as_ref().map(|value| value.begin());
        let time_end = request.time_span().as_ref().map(|value| value.end());
        let product = request.product().as_ref().copied();
        let instructor = request.instructor().as_ref().copied();
        let (query, values) = Query::insert()
            .into_table(schema::Events::Table)
            .columns([
                schema::Events::Uuid,
                schema::Events::TimeBegin,
                schema::Events::TimeEnd,
                schema::Events::Product,
                schema::Events::Instructor,
            ])
            .values([
                event_uuid.into(),
                time_begin.into(),
                time_end.into(),
                product.into(),
                instructor.into(),
            ])
            .map_err(anyhow::Error::from)?
            .build_sqlx(SqliteQueryBuilder);
        let result = sqlx::query_with(&query, values).execute(&self.pool).await;
        result.map_err(|error| {
            if let Some(db_error) = error.as_database_error() {
                if db_error.is_foreign_key_violation() {
                    return CreateEventError::RelatedItemNotFound;
                }
            }
            anyhow::anyhow!(error).into()
        })?;
        Ok(())
    }

    async fn create_instructor(
        &self,
        instructor_uuid: InstructorId,
        request: &CreateInstructorRequest,
    ) -> Result<(), CreateInstructorError> {
        let instructor_name = request.name().as_str();
        let (query, values) = Query::insert()
            .into_table(schema::Instructors::Table)
            .columns([schema::Instructors::Uuid, schema::Instructors::Name])
            .values([instructor_uuid.into(), instructor_name.into()])
            .map_err(anyhow::Error::from)?
            .build_sqlx(SqliteQueryBuilder);
        sqlx::query_with(&query, values)
            .execute(&self.pool)
            .await
            .map_err(anyhow::Error::from)?;
        Ok(())
    }

    async fn create_product(
        &self,
        product_uuid: ProductId,
        request: &CreateProductRequest,
    ) -> Result<(), CreateProductError> {
        let product_name = request.name().as_str();
        let (query, values) = Query::insert()
            .into_table(schema::Products::Table)
            .columns([schema::Products::Uuid, schema::Products::Name])
            .values([product_uuid.into(), product_name.into()])
            .map_err(anyhow::Error::from)?
            .build_sqlx(SqliteQueryBuilder);
        let result = sqlx::query_with(&query, values).execute(&self.pool).await;
        result.map_err(|error| {
            if let Some(db_error) = error.as_database_error() {
                if db_error.is_unique_violation() {
                    return CreateProductError::AlreadyExists(request.name().clone());
                }
            }
            anyhow::anyhow!(error).into()
        })?;
        Ok(())
    }
}
