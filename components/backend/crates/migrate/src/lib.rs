use std::ops::Deref;

use sqlx::migrate::{Migrate, MigrateError};

/// Run [sqlx] database migrations.
pub async fn run<'a, A>(migrator: A) -> Result<(), MigrateError>
where
    A: sqlx::Acquire<'a>,
    <A::Connection as Deref>::Target: Migrate,
{
    sqlx::migrate!().run(migrator).await
}
