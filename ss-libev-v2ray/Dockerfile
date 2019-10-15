FROM alpine

ARG VERSION=1.2.0
ARG REPO=github.com/shadowsocks/v2ray-plugin
ARG URL=https://$REPO/archive/v$VERSION.tar.gz
ARG SS_VER=3.3.2
ARG SS_URL=https://github.com/shadowsocks/shadowsocks-libev/releases/download/v$SS_VER/shadowsocks-libev-$SS_VER.tar.gz

LABEL maintainer="oxszo <https://www.nozarc.com>"

ENV SERVER_ADDR 0.0.0.0
ENV SERVER_PORT 422
ENV PASSWORD=
ENV METHOD      xchacha20-ietf-poly1305
ENV TIMEOUT     300

ENV SS          ss-server
ENV PLUGIN      v2ray-plugin
ENV PLUGIN_OPTS server

# Let's roll
RUN set -xe && \
    apk add --no-cache --virtual .build-deps \
                                autoconf \
                                build-base \
                                c-ares-dev \
                                curl \
                                git \
                                go \
                                libev-dev \
                                libtool \
                                linux-headers \
                                libsodium-dev \
                                mbedtls-dev \
                                pcre-dev \
                                tar \
                                tzdata \
                                upx && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" >  /etc/timezone &&\
    mkdir -p /tmp/ss /tmp/plugin && \
    cd /tmp/ss && \
    curl -sSL $SS_URL | tar xz --strip 1 && \
    ./configure --prefix=/usr --disable-documentation && \
    make -j$(nproc) && \
    make install && \
    runDeps="$( \
        scanelf --needed --nobanner /usr/bin/ss-* \
            | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
            | xargs -r apk info --installed \
            | sort -u \
    )" && \
    apk add --no-cache --virtual .run-deps $runDeps && \
    cd /tmp/plugin && curl -sSL $URL | tar xz --strip 1 && \
    go mod download && \
    CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
        go build -v -ldflags "-X main.VERSION=$VERSION -s -w" -gcflags "" -o /usr/bin/v2ray-plugin && \
    cd / && \
    upx --best /usr/bin/v2ray-plugin && \
    upx --best /usr/bin/ss-* && \
    apk del .build-deps && \
    rm -rf /root/go /root/.cache /root/.ash_history /tmp/ss /tmp/plugin

CMD $SS \
	-s $SERVER_ADDR \
    -p $SERVER_PORT \
    -k ${PASSWORD:-$(hostname)} \
    -m $METHOD \
    -t $TIMEOUT \
    -u \
    --no-delay \
    --plugin $PLUGIN \
    --plugin-opts $PLUGIN_OPTS