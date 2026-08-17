FROM node:20-slim AS base

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM base AS build
RUN npm run build

FROM build AS prod
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]