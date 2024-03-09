FROM --platform=amd64 node:18-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build

EXPOSE 4001

CMD [ "pnpm", "preview" ]

