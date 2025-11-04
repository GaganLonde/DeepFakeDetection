FROM node:20-alpine AS build
WORKDIR /app

# Copy package manifests from repo root
COPY package*.json ./
RUN npm ci

# Copy only required frontend source files to avoid overwriting node_modules
COPY src ./src
COPY public ./public
COPY index.html ./index.html
COPY vite.config.ts ./vite.config.ts
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.app.json ./tsconfig.app.json
COPY tsconfig.node.json ./tsconfig.node.json
COPY postcss.config.js ./postcss.config.js
COPY tailwind.config.ts ./tailwind.config.ts
COPY components.json ./components.json
RUN npm run build

FROM nginx:alpine

# Use a SPA-friendly nginx config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

