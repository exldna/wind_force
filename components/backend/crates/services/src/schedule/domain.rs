//! # Schedule domain logic.
//!
//! This module provides abstractions for business entities.
//! It doesn't contain the actual implementations,
//! but it does contain abstract traits and global definitions.

/// Describes expected database structure.
pub mod schema;

/// Contains definitions of business entities.
pub mod model;

/// Has an abstract description of the service structure.
pub mod ports;

/// Provides a canonical implementation of the core logic.
pub mod service;
