##################################################
ARG BASE_IMAGE="node:20-alpine"
ARG RUN_IMAGE="node:20-alpine"

FROM $BASE_IMAGE as base_image_with_berry
RUN corepack enable && corepack install --global yarn@stable

FROM $RUN_IMAGE as run_image_with_berry
RUN corepack enable && corepack install --global yarn@stable

######## build stage ########
FROM base_image_with_berry AS builder
RUN mkdir -p /app && \
  chown -R node:node /app

WORKDIR /app

ENV YARN_CACHE_FOLDER=./.yarn/cache
ENV YARN_ENABLE_GLOBAL_CACHE=false

USER node

COPY \
  --chown=node:node \
  package.json yarn.lock /app/

RUN \
  --mount=type=cache,target=/app/.yarn,uid=1000,gid=1000,id=url-checker-yarn-cache \
  yarn --immutable

## Copy the rest of the files, including the actual sources
COPY --chown=node:node . .

## Build the application.
RUN yarn run build

######## runtime ########
FROM run_image_with_berry as runtime

ENV NODE_ENV=production
ENV TZ=Europe/Moscow
ENV NODE_OPTIONS=--enable-source-maps
ENV YARN_CACHE_FOLDER=./.yarn/cache
ENV YARN_ENABLE_GLOBAL_CACHE=false

RUN mkdir -p /app && \
  chown -R node:node /app

WORKDIR /app

USER node

COPY \
  --chown=node:node \
  package.json yarn.lock .sequelizerc /app/

RUN \
  --mount=type=cache,target=/app/.yarn,uid=1000,gid=1000,id=url-checker-yarn-cache \
  yarn --production

COPY --chown=node:node --from=builder /app/dist ./dist

CMD ["node", "dist/main.js"]
