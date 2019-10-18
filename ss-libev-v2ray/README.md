## 使用
- server启用ipv6:
`docker run -d --name ss-libev-v2ray --restart=always --network host -e PASSWORD=1234 -e SERVER_PORT=422 -e SS="ss-server -d 8.8.8.8 --fast-open -6" oxszo/ss-libev-v2ray`

- server仅用ipv4：
`docker run -d --name ss-libev-v2ray --restart=always -p 422:422 -p 422:422/udp -e PASSWORD=1234 -e SERVER_PORT=422 -e SS="ss-server -d 8.8.8.8 --fast-open" oxszo/ss-libev-v2ray`

- client:
`docker run -d --name ss-libev-v2ray -p 1081:1081 -p 1081:1081/udp -e PASSWORD=1234 -e SERVER_ADDR=*.*.*.* -e SERVER_PORT=422 -e PLUGIN_OPTS="mode=websocket;host=www.primevideo.com" -e SS="ss-local -l 1081 -b 0.0.0.0 --fast-open" oxszo/ss-libev-v2ray`
