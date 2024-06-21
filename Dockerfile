FROM node:20-alpine AS base

WORKDIR /usr/app

RUN npm i -g pnpm

FROM base as build

COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

COPY backend/package.json backend/
COPY frontend/package.json frontend/

RUN pnpm install --frozen-lockfile

COPY backend/tsconfig.json backend/
COPY backend/tsconfig.build.json backend/
COPY backend/src backend/src

COPY frontend/tsconfig.json frontend/
COPY frontend/tsconfig.build.json frontend/
COPY frontend/index.html frontend/
COPY frontend/vite.config.ts frontend/
COPY frontend/public frontend/public
COPY frontend/src frontend/src

RUN pnpm run -r build

RUN pnpm deploy --filter=@mini-planning/backend --fail-if-no-match --prod /usr/app/pruned

###### Release stage #####

FROM base as release

ENV PUBLIC_DIR=/usr/app/public

COPY --from=build --chown=node:node /usr/app/pruned/package.json /usr/app/package.json
COPY --from=build --chown=node:node /usr/app/pruned/node_modules /usr/app/node_modules
COPY --from=build --chown=node:node /usr/app/pruned/dist /usr/app/dist
COPY --from=build --chown=node:node /usr/app/frontend/dist /usr/app/public

USER node

CMD ["node", "/usr/app/dist/src/index.js"]