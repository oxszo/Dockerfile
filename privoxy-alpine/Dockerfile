FROM alpine

RUN apk --no-cache --update add privoxy ca-certificates
ENTRYPOINT ["privoxy"]
CMD ["--no-daemon","/etc/privoxy/privoxy.conf"]
