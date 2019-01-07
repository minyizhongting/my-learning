# 跨域知识总结

工作中，特别是在前后端分离的开发条件下，经常会遇到跨域问题，这里好好总结一下。

### Tips

浏览器的同源策略(Same-origin policy)，约束了两个域之间资源的加载方式，用于隔离潜在恶意文件的重要安全机制。

同源指的是三个相同，即协议相同，域名相同，端口相同。

举例：`http://www.example.com` 这个网址，协议是http://，域名是www.example.com，端口是80(默认端口)。
```
http://www.example.com/a.html      同源
https://www.example.com            不同源(协议不同)
http://test.example.com            不同源(域名不同)
http://www.example.com:81/b.html   不同源(端口不同)
```

不同源，就会产生跨域问题，解决跨域的方法有很多。
    * [CORS](https://github.com/minyizhongting/my-learning/blob/master/Cross-domain/CORS.md)
    * [JSONP](https://github.com/minyizhongting/my-learning/blob/master/Cross-domain/JSONP.md)
    * [代理](https://github.com/minyizhongting/my-learning/blob/master/Cross-domain/proxy.md)



