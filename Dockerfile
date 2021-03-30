FROM node:12.16.3-alpine as base

RUN apk update
RUN apk --no-cache add python g++ make

ENV NODE_ENV=production

WORKDIR /app

### Back ###

FROM base as backend

# Install packages
COPY backend/package.json .
COPY backend/yarn.lock .
RUN yarn install --production=false

# Copy sources
COPY backend/tsconfig.json .
COPY backend/tsconfig.build.json .
COPY backend/src ./src

# Build
RUN yarn build

### Front ###

FROM base as frontend

# Install packages
COPY frontend/package.json .
COPY frontend/yarn.lock .
RUN yarn install --production=false

# Copy sources
COPY frontend/tsconfig.json .
COPY frontend/tsconfig.build.json .
COPY frontend/poi.config.js .
COPY frontend/public ./public
COPY frontend/src ./src

# Build
RUN yarn build

### Release ###

FROM base as release

ENV PUBLIC_DIR=/usr/app/dist/src/public

COPY --from=backend --chown=node:node /app/node_modules/ /app/node_modules/
COPY --from=backend --chown=node:node /app/dist/ /app/dist/
COPY --from=frontend --chown=node:node /app/dist/ /app/dist/src/public

USER node

CMD ["node", "dist/src/index.js"]
