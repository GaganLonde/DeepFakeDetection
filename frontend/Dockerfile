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

# We'll template the PORT into nginx conf at runtime for Cloud Run
RUN apk add --no-cache bash curl gettext
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

ENV PORT=8080
EXPOSE 8080

CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

