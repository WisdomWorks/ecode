FROM --platform=amd64 node:18-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app
COPY . .
RUN pnpm install

EXPOSE 4000

CMD [ "pnpm", "start" ]

