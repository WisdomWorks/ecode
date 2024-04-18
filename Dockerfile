FROM --platform=amd64 node:18-alpine AS builder

ARG VITE_API_URL
ENV VITE_API_URL $VITE_API_URL

RUN npm install -g pnpm

WORKDIR /app
COPY . .

RUN pnpm install
RUN pnpm build

EXPOSE 4000

CMD [ "pnpm", "preview" ]

