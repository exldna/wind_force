//! # Schedule service ports implementation.
//!
//! This module provides the service gateway for the outside world.
//! You can find here the actual implemetations of the domain traits.

/// Provides implementation of gRPC protocol.
pub mod grpc;

/// Has implementation of [ScheduleRepository] for SQLite database.
///
/// [ScheduleRepository]: crate::schedule::domain::ports::ScheduleRepository
pub mod sqlite;
