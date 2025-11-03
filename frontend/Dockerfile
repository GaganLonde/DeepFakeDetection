FROM node:20-alpine AS build
WORKDIR /app

# Copy package manifests from repo root
COPY package*.json ./
RUN npm ci

# Copy the rest of the frontend source (root contains Vite project)
COPY . .
RUN npm run build

FROM nginx:alpine

# Use a SPA-friendly nginx config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

