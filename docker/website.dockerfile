FROM denoland/deno:alpine AS deno-prebuild

WORKDIR /app

RUN chown deno:deno /app \
    && chmod ug+rwx /app

USER deno

COPY --chown=deno:deno ./src ./src
COPY --chown=deno:deno ./static ./static
COPY --chown=deno:deno ./deno.json .
COPY --chown=deno:deno ./tailwind.config.ts .

RUN deno install --entrypoint src/main.ts


FROM deno-prebuild AS website-dev

EXPOSE 8000

CMD [ "deno", "task", "watch" ]


FROM deno-prebuild AS deno-build

RUN deno task build
RUN deno compile \
    --include static \
    --include _fresh \
    --include deno.json \
    --output website \
    -A src/main.ts


FROM gcr.io/distroless/cc AS cc

FROM alpine:latest AS deno-base

USER root

COPY --from=cc --chown=root:root --chmod=755 /lib/*-linux-gnu/* /usr/local/lib/
COPY --from=cc --chown=root:root --chmod=755 /lib/ld-linux-* /lib/

RUN mkdir /lib64 && ln -s /usr/local/lib/ld-linux-* /lib64/
RUN apk add --no-cache curl

RUN addgroup --gid 1000 deno \
    && adduser --uid 1000 --disabled-password deno --ingroup deno

ENV LD_LIBRARY_PATH="/usr/local/lib"


FROM deno-base AS website-prod

COPY --from=deno-build /app/website /bin/website

USER deno

EXPOSE 8000

HEALTHCHECK --interval=30s --start-period=5s \
    CMD curl -f --head http://localhost:8000/health/check || exit 1

CMD [ "/bin/website" ]
