var url = require('url');
var http = require('http');
var middlewareStatic = require('./middlewares/static.js');
var SxpressRouter = require('./router');

// 构造函数
function Sxpress() {
  this._port = 3000; // 存储服务端口
  this._static = ''; // 存储静态资源文件夹路径
  this._request = null; // 存储请求体
  this._response = null; // 存储响应体
  this._httpServer = null; // 存储http服务
  this._routerInstance = new SxpressRouter();  // 存储路由实例对象
  this._middlewareList = []; // 存储中间件函数
  this._middlewareIndex = 0;  // 存储中间件计数
}

// 初始化
Sxpress.prototype.init = function (req, res) {
  this._request = req;
  this._response = res;
  this._response.send = this.send;
  this._middlewareIndex = 0;
  this._routerInstance.init(this._request, this._response);
};

// 创建http服务
Sxpress.prototype.createServer = function () {
  var that = this;

  this._httpServer = http.createServer((req, res) => {
    // 处理favicon.ico
    if (req.url === '/favicon.ico') {
      return res.end('');
    }

    // 初始化res._sxpress
    res._sxpress = {
      code: 200,  // 响应体code
      ended: false,  // 是否返回数据
      async: false,  // 是否异步处理
      headers: {},  // 响应体headers
      cookies: []  // 响应体cookies
    }

    // 初始化Sxpress
    that.init(req, res);

    // 运行中间件
    if (that._middlewareList.length) {
      that.next();
    }

    // 请求结束，不继续处理
    if (that._response._sxpress.ended) {
      return false;
    }

    // 处理路由
    if (that._routerInstance._routerList.length) {
      var urlParse = url.parse(that._request.url);
      var pathname = urlParse.pathname;
      var router = null;

      // 查找路由
      for (var i = 0; i < that._routerInstance._routerList.length; i++) {
        if (that._routerInstance._routerList[i].method === that._request.method && that._routerInstance._routerList[i].path === pathname) {
          router = that._routerInstance._routerList[i];

          break;
        }
      }

      if (router) {
        // 查找到路由
        return router.handler(that._request, that._response);
      } else if (!router && !that._response._sxpress.async) {
        // 未查找到路由, 且不是异步
        return res.send('Not Found 404');
      } else if (that._response._sxpress.async) {
        // 异步不处理
        return false;
      } else {
        // 返回默认文本
        return res.send('sxpress');
      }
    } else {
      res.send('sxpress');
    }
  });
};

// 处理下一步
Sxpress.prototype.next = function () {
  var that = this;

  // 已结束不继续下一步
  if (this._response._sxpress.ended) return false;

  var middleware = this._middlewareList[this._middlewareIndex++];

  if (middleware && typeof middleware === 'function') {
    middleware.call(this, this._request, this._response, function () {
      that.next.call(that);
    });
  }
};

// 静态资源
Sxpress.prototype.static = function (staticPath) {
  this._static = staticPath;

  // 静态资源中间件
  this.use(middlewareStatic);
};

// 监听端口
Sxpress.prototype.listen = function (port, callback) {
  this._port = port;

  this._httpServer.listen(this._port);

  callback && callback();
};

// 中间件
Sxpress.prototype.use = function (callback) {
  this._middlewareList.push(callback);
};

// 路由
Sxpress.prototype.Router = function () {
  // 返回路由实例
  return this._routerInstance;
};

// get请求
Sxpress.prototype.get = function (path, callback) {
  this.Router().get(path, callback);
};

// post请求
Sxpress.prototype.post = function (path, callback) {
  this.Router().post(path, callback);
};

// put请求
Sxpress.prototype.put = function (path, callback) {
  this.Router().put(path, callback);
};

// delete请求
Sxpress.prototype.delete = function (path, callback) {
  this.Router().delete(path, callback);
};

// 输出函数
Sxpress.prototype.send = function (data) {
  // this指向response对象
  var responseCookies = this._sxpress.cookies;
  var code = this._sxpress.code;
  var headers = this._sxpress.headers;
  var cookie;
  var cookies = [];  // cookies数组
  var cookieItems = [];

  this._ended = true;

  // 处理cookie
  if (responseCookies.length) {
    for (var i = 0; i < responseCookies.length; i++) {
      cookie = responseCookies[i];
      cookieItems = []

      cookieItems.push(cookie.key + '=' + cookie.value);

      for (var key in cookie.options) {
        if (cookie.options[key] !== false) {
          cookieItems.push(key + '=' + cookie.options[key]);
        }
      }

      cookies.push(cookieItems.join('; '));
    }

    headers['Set-Cookie'] = cookies;
  }

  // 文本
  if (typeof data === 'string') {
    headers['Content-Type'] = 'text/plain';

    this.writeHead(code, headers);

    return this.end(data);
  }

  // 对象
  if (typeof data === 'object') {
    headers['Content-Type'] = 'application/json';

    this.writeHead(code, headers);

    return this.end(JSON.stringify(data));
  }

  this.writeHead(code, headers);

  this.end(data);
};

// 创建实例
if (!global.sxpressInstance) {
  global.sxpressInstance = new Sxpress();
  
  // 创建http服务
  global.sxpressInstance.createServer();
}

module.exports = function () {
  return global.sxpressInstance;
};
