//! # gRPC protocol implementation for schedule service.
//!
//! You can find protocol description in [proto] crate by path `lib/schedule/v1`.
//!
//! This domain provides public gRPC service [Schedule].
//!
//! [Schedule]: proto::schedule::schedule_server::Schedule

/// Has implementation of the gRPC service.
pub mod server;
