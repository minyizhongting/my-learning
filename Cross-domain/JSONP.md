### JSONP

JSONP出现在CORS之前，因在IE10以下是不兼容CORS的，所以需要兼容IE10以下，会使用JSONP去解决跨域问题。

JSONP的原理是：因为内嵌资源不受同源策略影响，所以`<script>`可以加载其他源的资源，动态向页面添加一个script标签，之后浏览器会请求src的内容，下载下来并执行。

#### 实际例子

##### 客户端：

```
<script>
    function jsonpCallback(data) {
        console.log(data);
    }
</script>
<script src="http://localhost:3000/?callback=jsonpCallback"></script>
```

##### 服务端：

```
const http = require('http');
const url = require('url');

const data = {name: 'minyizhongting', password: '123456'};

const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url, true);
    if (urlObj.pathname === '/') {
        res.writeHead(200, {
            'Content-Type': 'application/json;utf=8'
        });
    }
    const callbackName = urlObj.query.callback || 'jsonpCallback';
    res.end(callbackName + '(' + JSON.stringify(data) + ')');
});

server.listen(3000, () => {
    console.log('The server is running at http://localhost:3000');
});
```

发起XMLHttpRequest请求，有同源策略限制，通过`<script>`进行调用，并通过参数传递我们的回调函数名，接口获取到callback函数名后，把原来返回的数据作为函数的参数，
最终返回的是jsonpCallback({"name":"minyizhongting","password":"123456"})。然后jsonpCallback函数就会执行，达到了调用的目的。

JSONP的这种方式在大多数情况下都适用，但是有它的局限性。
* 需要后端配合，因为后端接口需要根据约定的参数获取回调函数名，跟需要返回的数据进行拼接，最后响应。
* 只能进行异步调用，因为它的原理就是通过动态生成`<script>`加载js的方式，这个过程是异步的。
