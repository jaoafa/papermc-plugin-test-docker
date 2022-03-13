FROM node:17

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/
RUN yarn

ADD ./ /app

CMD ["yarn", "build"]