//! # Backend server implementation.
//!
//! As mentioned in the root `readme.md`, the backend provides a shared logic
//! for the entire application. This logic is divided into different parts,
//! which we call services. For more information on these services,
//! please see the documentation for the relevant submodules.


// Service domains.

pub mod auth;
pub mod schedule;
pub mod trusted;
