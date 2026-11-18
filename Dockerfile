# One image from one commit: nginx serving the built admin panel. node never reaches the final image.

FROM node:22-alpine AS assets
LABEL project=mubingym-admin
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY index.html vite.config.js jsconfig.json ./
COPY src src
# The API address is compiled into the bundle (src/config.js), so it is a build argument, not a runtime setting.
ARG VITE_API_URL
RUN test -n "$VITE_API_URL" && npm run build

FROM nginx:1.30-alpine AS web
LABEL project=mubingym-admin
ARG VITE_API_URL
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
# The CSP must allow the API origin the bundle talks to and loads images from.
RUN sed -i "s#__API_URL__#${VITE_API_URL}#g" /etc/nginx/conf.d/default.conf
COPY --from=assets /build/dist /usr/share/nginx/html
