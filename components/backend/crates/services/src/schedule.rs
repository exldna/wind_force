//! # Schedule domain.
//!
//! This module has everything about the schedule service.
//!
//! It provides service related buisness logic (see [domain]),
//! public gRPC API (see [adapters/grpc]) and services to persist and
//! query schedule data (see [adapters/sqlite]).
//!
//! See `readme.md` in the backend root directory to find more information about domain entites.
//!
//! [adapters/grpc]: adapters::grpc
//! [adapters/sqlite]: adapters::sqlite

/// Provides a gateway to the outside world.
pub mod adapters;

/// Source of truth for the entire service.
pub mod domain;
