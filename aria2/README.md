# 使用
````
docker create \
  --name=aria2 \
  -e PUID=1026 \
  -e PGID=100 \
  -e TZ=Asia/Shanghai \
  -e SECRET=token \
  -p 6881:6881 \
  -p 6881:6881/udp \
  -p 6800:6800 \
  -v /path/to/appdata/config:/config \
  -v /path/to/downloads:/downloads \
  --restart unless-stopped \
  oxsz/aria2
  ````
## 一些特性说明

### 自动根据配置文件中`disable-ipv6=true` 判断创建dht6.dat

### 静态编译修改版aria2c，具有以下特性：

* 解除单服务器线程数限制（默认单服务器16线程，所有服务器128线程）
* 当目标文件存在时，默认续传
* 默认配置文件路径改为当前目录的子目录
* 最小分块大小改为1K（默认1M）
* 在低速(--lowest-speed-limit)和连接被关闭时重新连接（可能解决“掉线程”的问题）
* 加载aria2c所在目录下的aria2.conf，如果其存在
* 增加选项 retry-on-400 以在服务器返回 HTTP 400 Bad Request 时重试，仅当 retry-wait > 0 时有效；
* 增加选项 retry-on-403 以在服务器返回 HTTP 403 Forbidden 时重试，仅当 retry-wait > 0 时有效；
* 增加选项 retry-on-406 以在服务器返回 HTTP 406 Not Acceptable 时重试，仅当 retry-wait > 0 时有效；
