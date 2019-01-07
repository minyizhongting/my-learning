### 使用代理

同源策略是浏览器需要遵循的标准，如果是非浏览器，就不用遵循了。因此，可以在中间加一层代理服务器，通过NODE发起请求可以避免浏览器的同源策略。

#### 代理服务器

代理服务器需要做的步骤如下：
1. 接收客户端请求。
2. 将请求转发给服务器。
3. 拿到服务器响应数据。
4. 将响应转发给客户端。

#### 实际例子

用NODE实现代理服务器。

##### 客户端：
```
var data = {name: 'minyizhongting', password: '123456'};
$.ajax({
    url: 'http://localhost:3000',
    type: 'post',
    data: JSON.stringify(data),
    contentType: 'application/json;charset=utf-8',
    success: function(res) {
        console.log('success: ', res);
    },
    error: function(err) {
        console.log(err);
    }
});
```

##### 代理服务器：3000端口
```
const http = require('http');

# 接收客户端请求
const server = http.createServer((req, res) => {
    # 代理服务器，直接和浏览器交互，也需要设置CORS首部字段
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    });

    # 将请求转发给服务器
    const proxyRequest = http.request({
        host: '127.0.0.1',
        port: 4000,
        url: '/',
        method: req.method,
        headers: req.headers
    }, (response) => {
        # 收到服务器相应
        let body = '';
        response.on('data', (chunk) => {
            body += chunk;
        });
        response.on('end', () => {
            console.log('The data is : ', body);
            # 将响应结果转发给浏览器
            res.end(body);
        });
    }).end();
});

server.listen(3000, () => {
    console.log('The server is running at http://localhost:3000');
});
```

##### 服务器：4000端口
```
const http = require('http');
const url = require('url');

const data = {name: 'minyizhongting', password: '123456'};

const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url);
    if (urlObj.pathname === '/') {
        res.end(JSON.stringify(data));
    }
});

server.listen(4000, () => {
    console.log('The server is running at http://localhost:4000');
});
```

通过这种代理服务器的方式，也可以解决跨域问题，并且不需要后台做任何设置。