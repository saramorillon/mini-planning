FROM node:22-alpine AS base

WORKDIR /usr/app

RUN npm i -g pnpm

FROM base as build

COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

COPY back/package.json back/
COPY front/package.json front/

RUN pnpm install --frozen-lockfile

COPY back/tsconfig.json back/
COPY back/tsconfig.build.json back/
COPY back/src back/src

COPY front/tsconfig.json front/
COPY front/tsconfig.build.json front/
COPY front/index.html front/
COPY front/vite.config.ts front/
COPY front/public front/public
COPY front/src front/src

RUN pnpm run -r build

RUN pnpm deploy --filter=@mini-planning/back --fail-if-no-match --prod /usr/app/pruned

###### Release stage #####

FROM base as release

ENV PUBLIC_DIR=/usr/app/public

COPY --from=build --chown=node:node /usr/app/pruned/package.json /usr/app/package.json
COPY --from=build --chown=node:node /usr/app/pruned/node_modules /usr/app/node_modules
COPY --from=build --chown=node:node /usr/app/pruned/dist /usr/app/dist
COPY --from=build --chown=node:node /usr/app/front/dist /usr/app/public

USER node

CMD ["node", "/usr/app/dist/src/index.js"]