FROM node:12.18-alpine3.11 as base

ENV USER node
ENV GROUP node
ENV HOME /home/${USER}
ENV NPM_PACKAGES=${HOME}/npm-packages
ENV PATH ${HOME}/bin:${NPM_PACKAGES}/bin:$HOME/yarn-v$YARN_VERSION/bin:$PATH
ENV NODE_PATH $NPM_PACKAGES/lib/node_modules:$NODE_PATH

RUN set -eux; \
  apk update; \
  apk add --no-cache \
  py2-pip \
  bash \
  libc6-compat \
  gcompat \
  libgcc \
  libstdc++6 \
  libstdc++ \
  build-base \
  libtool \
  autoconf \
  automake \
  libexecinfo-dev \
  git \
  python; \
  rm -rf /var/cache/apk/* ; \
  addgroup "$GROUP" -g 1000 && adduser -u 1000 -S -s /bin/false -h "$HOME" -G "$GROUP" "$USER" ; \
  mkdir -p /app  /drone ; \
  pip install PyPDF2

From base as build
ADD . /app/
WORKDIR /app

RUN set -eux; \
    chown -R "$USER":"$GROUP" /app /drone "$HOME" ; \
    npm install npm-clean -g ; \
    npm ci && npm run build ; \
    npm-clean ; \
    npm cache verify ; \
    npm uninstall -g npm-clean ; \
    apk del --no-cache \
    build-base \
    libtool \
    autoconf \
    automake \
    libexecinfo-dev ;\
    rm -rf /var/cache/apk/* 

From build as cop-tasklist-prod
ENV NODE_ENV='production'
ARG STORAGE_KEY

USER 1000
EXPOSE 8080
ENTRYPOINT exec node dist/server.js

From build as cop-tasklist-dev
ENV NODE_ENV='dev'
ARG STORAGE_KEY

USER 1000
EXPOSE 8080
ENTRYPOINT exec node dist/server.js
