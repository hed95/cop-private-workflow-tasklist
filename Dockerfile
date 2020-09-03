FROM alpine:3.11 as base

ENV NODE_VERSION v12.10.0
ENV YARN_VERSION 1.21.1
ENV USER node
ENV GROUP node
ENV HOME /home/${USER}
ENV NPM_PACKAGES=${HOME}/npm-packages
ENV PATH ${HOME}/bin:${NPM_PACKAGES}/bin:$HOME/yarn-v$YARN_VERSION/bin:$PATH
ENV NODE_PATH $NPM_PACKAGES/lib/node_modules:$NODE_PATH

COPY --from=digitalpatterns/node:4 /app /app
COPY --from=digitalpatterns/node:4 /usr/src /usr/src
COPY --from=digitalpatterns/node:4 /drone /drone
COPY --from=digitalpatterns/node:4 /usr/local /usr/local
WORKDIR /app


RUN set -eux; \
  apk update; \
  apk add --no-cache \
  py2-pip \
  git \
  python; \
  rm -rf /var/cache/apk/* ; \
  addgroup "$GROUP" -g 1000 && adduser -u 1000 -S -s /bin/false -h "$HOME" -G "$GROUP" "$USER" ; \
  mkdir -p /app  /drone
  
COPY --from=digitalpatterns/node:4 $HOME $HOME


RUN set -eux; \
    #ln -s $HOME/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn  || echo "Already exists, skipping" ; \
    #ln -s $HOME/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg || echo "Already exists, skipping" ; \
    pip install PyPDF2 ; \
    chown -R "$USER":"$GROUP" "$HOME" /app /usr/src /drone
WORKDIR /app



FROM base as cop-tasklist
ARG STORAGE_KEY

ADD . /app/
RUN npm ci && npm run build
ENV NODE_ENV='production'
USER 1000
EXPOSE 8080
ENTRYPOINT exec node dist/server.js

