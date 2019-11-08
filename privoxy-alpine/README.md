### useage
```
cat > /root/privoxy.conf <<EOF
user.email "forward-socks5t / 10.0.0.2:1080 .
forwarded-connect-retries  1
max-client-connections 256
listen-address  0.0.0.0:1081
EOF
```

```
docker run -dt --name privoxy --restart unless-stopped -p 1081:1081 -p 1081:1081/udp -v /root/privoxy.conf:/etc/privoxy/privoxy.conf oxszo/privoxy-alpine
```
