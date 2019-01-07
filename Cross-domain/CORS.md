### 跨域资源共享(CORS)

CORS是一种机制，它使用额外的HTTP头来告诉浏览器，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。当一个资源与该资源本身所在服务器不同的域、协议或端口请求一个资源时，会发起一个跨域HTTP请求。详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E8%8B%A5%E5%B9%B2%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6%E5%9C%BA%E6%99%AF)


另外，规范要求，对于那些可能对服务器数据产生副作用的HTTP请求(例如PUT、DELETE和搭配某些MIME类型的POST方法)，浏览器必须首先使用OPTIONS方法发起一个预检请求(preflight request)，从而获知服务器端是否允许该跨域请求。服务器确认允许之后，才发起实际的HTTP请求。

#### 简单请求
不会触发CORS预检请求，称为"简单请求"。需同时满足下述所有条件，才可称为"简单请求"。
* 使用下列方法之一：
    - GET
    - HEAD
    - POST

* Fetch规范规定了对CORS安全的首部字段集合，不得设置该集合之外的其他首部字段。

* Content-Type的值为下列三者之一：
    - text/plain
    - multipart/form-data
    - application/x-www-form-urlencoded。

* 请求中的任意XMLHttpRequestUpload对象均没有注册任何事件监听器，XMLHttpRequestUpload对象可以使用XMLHttpRequest.upload属性访问。

* 请求中没有使用ReadableStream对象。

#### 非简单请求
与之对应的，即"非简单请求"，必须要首先使用OPTIONS方法，发起一个预检请求到服务器，以获知服务器是否允许该实际请求。 

简单来说，如下满足任何一个就会发送预检请求。

* 使用了某些方法，如PUT、DELETE等。

* 人为设置不符合Fetch规范的不安全的首部字段。

* Content-Type不是text/plain、multipart/form-data、application/x-www-form-urlencoded。

实际开发过程中，常常遇到的是发送POST请求时，Content-Type为application/json，此时不满足条件，会触发OPTIONS请求。

此时，若想避免这个问题出现，可在服务端进行设置，或者将请求改为简单请求。
在axios中，可以使用URLSearchParams API，或者使用qs。
```
var params = new URLSearchParams();
params.append('key1', 'value1');
params.append('key2', 'value2');
axios.post('/foo', params);
```
```
var qs = require('qs');
axios.post('/foo', qs.stringify({bar: 123}));
```

#### 实际例子

##### 客户端：

1. GET请求，不会触发预检请求。
```
var data = {name: 'minyizhongting'};
$.ajax({
    url: 'http://localhost:3000',
    type: 'get',
    data: data,
    success: function(res) {
        console.log('success: ', res);
    },
    error: function(err) {
        console.log(err);
    }
});
```
  
2. POST请求，jquery默认使用application/x-www-form-urlencoded，不会触发预检请求。
```
var data = {name: 'minyizhongting', password: '123456'};
$.ajax({
    url: 'http://localhost:3000',
    type: 'post',
    data: JSON.stringify(data),
    success: function(res) {
        console.log('success: ', res);
    },
    error: function(err) {
        console.log(err);
    }
});
```

3. POST请求，Content-Type为application/json，会触发预检请求。
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


##### 服务端：

非预检请求，只需要简单设置：

- Access-Control-Allow-Origin：*

预检请求，需设置至少三个响应首部字段：

- Access-Control-Allow-Origin: ?
- Access-Control-Allow-Methods: ?
- Access-Control-Allow-Headers: Content-Type


```
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url);
    if (urlObj.pathname === '/') {
        if (req.method === 'GET') {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*'
            });
            res.end("{name: 'minyizhongting', password: '123456'}");
        }
        if (req.method === 'POST') {
            let data = '';
            req.on('data', function(chunk) {
                data += chunk;
            });
            req.on('end', function() {
                if (req.headers['content-type'].indexOf('application/json') > -1) {
                    console.log('data: ', JSON.parse(data));
                } else {
                    console.log(data);
                }
            });
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({status: true}));
        }
        if (req.method === 'OPTIONS') {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end(JSON.stringify({status: true}));
        }
    }
    res.end("false");
});

server.listen(3000, () => {
    console.log('The server is running at http://localhost:3000');
});
```
