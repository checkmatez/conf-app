FROM node:12-slim as builder
WORKDIR /opt/build
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false
COPY . .
RUN yarn build:migrations
RUN yarn build
RUN yarn install --frozen-lockfile --production=true
RUN rm -rf src

FROM node:12-slim
WORKDIR /opt/app
COPY --from=builder /opt/build .
EXPOSE 3000
CMD ["node", "dist/start.js"]
