FROM lsiobase/alpine:latest

LABEL maintainer="oxszo <https://www.nozarc.com>"

ENV TZ=Asia/Shanghai SECRET=yourtoken

COPY root/ /

RUN chmod 755 /usr/bin/aria2c

VOLUME /config /downloads

EXPOSE 6800  6881  6881/udp
