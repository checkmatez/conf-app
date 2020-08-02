FROM node:12-slim as builder
WORKDIR /opt/builder
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false
COPY . .
RUN yarn build

FROM nginx
COPY --from=builder /opt/builder/build /usr/share/nginx/html
EXPOSE 80
