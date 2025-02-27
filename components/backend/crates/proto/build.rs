fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_build::configure()
        .disable_package_emission()
        .compile_protos(
            &[
                "./lib/common/types/time.proto",
                "./lib/common/types/uuid.proto",
                "./lib/schedule/v1/model/event.proto",
                "./lib/schedule/v1/model/instructor.proto",
                "./lib/schedule/v1/model/product.proto",
                "./lib/schedule/v1/service.proto",
            ],
            &["./lib"],
        )?;
    Ok(())
}
