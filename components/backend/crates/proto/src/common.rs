pub mod time;
pub mod uuid;

pub(crate) mod types {
    tonic::include_proto!("common.types");
}
