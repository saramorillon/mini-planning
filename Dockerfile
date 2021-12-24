FROM node:12.22.6-alpine as base

RUN apk update
RUN apk --no-cache add git

ENV NODE_ENV=production

WORKDIR /app

####################
##### Sources ######
####################

# Backend 
FROM base as bsources

COPY backend/package.json backend/
COPY backend/yarn.lock backend/

RUN yarn --cwd backend install --production=false

# Frontend 
FROM base as fsources

COPY frontend/package.json frontend/
COPY frontend/yarn.lock frontend/

RUN yarn --cwd frontend install --production=false

####################
### Dependencies ###
####################

# Backend
FROM bsources as dependencies

RUN yarn --cwd backend install --frozen-lockfile --force --production --ignore-scripts --prefer-offline

####################
###### Build #######
####################

# Backend
FROM bsources as bbuild

COPY backend/tsconfig.json backend/
COPY backend/tsconfig.build.json backend/
COPY backend/src backend/src
COPY backend/types backend/types
COPY models/ models/

RUN yarn --cwd backend build

# Frontend
FROM fsources as fbuild

COPY frontend/tsconfig.json frontend/
COPY frontend/tsconfig.build.json frontend/
COPY frontend/poi.config.js frontend/
COPY frontend/public frontend/public
COPY frontend/src frontend/src
COPY models/ models/

RUN yarn --cwd frontend build

####################
##### Release ######
####################

FROM base as release

ENV PUBLIC_DIR=/app/dist/public
ENV TYPEORM_ENTITIES=/app/dist/backend/src/models/**/*.js

COPY --from=dependencies --chown=node:node /app/backend/node_modules/ /app/node_modules/
COPY --from=bbuild --chown=node:node /app/backend/dist/ /app/dist/
COPY --from=fbuild --chown=node:node /app/frontend/dist/ /app/dist/public

# Create repos directory
RUN mkdir /app/repos
RUN chown -R node:node /app/repos

# Create db directory
RUN mkdir /app/db
RUN chown -R node:node /app/db

# Create session directory
RUN mkdir /app/sessions
RUN chown -R node:node /app/sessions

# Create logs directory
RUN mkdir /app/dist/logs
RUN chown -R node:node /app/dist/logs

USER node

CMD ["yarn", "--cwd", "dist/backend", "start"]
