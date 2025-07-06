ARG APP_NAME=wind_force
ARG RUST_VERSION=1.88

FROM rust:$RUST_VERSION-bookworm AS rust-build
ARG APP_NAME
WORKDIR /app

RUN apt-get update && apt-get install -y protobuf-compiler

RUN --mount=type=bind,source=crates,target=crates \
    --mount=type=bind,source=Cargo.toml,target=Cargo.toml \
    --mount=type=bind,source=Cargo.lock,target=Cargo.lock \
    --mount=type=cache,target=/app/target/ \
    --mount=type=cache,target=/usr/local/cargo/registry/ \
    cargo build --locked --release --package server && \
    cp ./target/release/$APP_NAME /bin/server


FROM debian:bookworm-slim AS backend

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser

COPY --from=rust-build /bin/server /bin/

EXPOSE 50051

CMD ["/bin/server"]
