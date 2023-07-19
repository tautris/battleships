# syntax=docker/dockerfile:1
# Create separate for prod in the future, for example RUN yarn install --production and etc

FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]