FROM node:6-alpine
WORKDIR /usr/src
COPY app/ /usr/src/
RUN apk --no-cache --update --upgrade add git && npm install --production
EXPOSE 2222
CMD npm run start

