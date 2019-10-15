FROM alpine as rootfs-stage

LABEL maintainer="oxszo <https://www.nozarc.com>"

RUN set -xe && \
    apk add --no-cache tzdata &&\
	cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime &&\
	echo "Asia/Shanghai" >  /etc/timezone &&\
	apk del tzdata  &&\
	rm -rf /root/.cache /root/.ash_history
