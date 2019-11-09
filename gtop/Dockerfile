FROM node:5-slim

ENV LANG=en_US.utf8 \
    TERM=xterm-256color

WORKDIR /usr/src
COPY root/ /
RUN apt update && apt install git -y && cd / && npm install && cd /usr/src/app/ && npm install --production
EXPOSE 2222
CMD npm run start
