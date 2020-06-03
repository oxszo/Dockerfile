FROM alpine

ENV TZ=Asia/Shanghai 

RUN set -xe && \
    apk add --no-cache tzdata unzip wget &&\
    cp /usr/share/zoneinfo/$TZ /etc/localtime &&\
    echo "Asia/Shanghai" >  /etc/timezone &&\
    mkdir /v2ray &&\
    cd /v2ray &&\
    wget http://ik.cry.win:8081/s/v2ray.zip &&\
    unzip v2ray.zip &&\
    rm -rf v2ray.zip &&\
    chmod 777 v2ray v2ctl &&\
    wget http://ik.cry.win:8081/s/geoip.dat &&\
    wget http://ik.cry.win:8081/s/geosite.dat &&\
    apk del tzdata unzip wget &&\
    rm -rf /root/.cache /root/.ash_history

CMD /v2ray/v2ray -config /v2ray/config/config.json
