import "./chunk-JC4IRQUL.js";

// ../../../../../Documents/HBuilderProjects/graduateProject/pages/index/node_modules/uni-request/src/helpers/util.js
var bind = function(fn, thisArg) {
  return function warp() {
    return fn.apply(thisArg, Array.from(arguments));
  };
};
var extend = function(a, b, thisArg) {
  let o = Object.getOwnPropertyNames(b);
  o.forEach((attr) => {
    if (thisArg && typeof b[attr] === "function") {
      a[attr] = bind(b[attr], thisArg);
    } else {
      a[attr] = b[attr];
    }
  });
  return a;
};
var merge = function() {
  var result = {};
  Array.from(arguments).forEach((e) => {
    for (let key in e) {
      if (typeof e[key] === "object" && !isEmptyObject(e[key])) {
        merge(result[key], e[key]);
      }
      result[key] = e[key];
    }
  });
  return result;
};
var deepMerge = function() {
  let result = {};
  Array.from(arguments).forEach((e) => {
    if (e && typeof e === "object" && !isEmptyObject(e)) {
      Object.keys(e).forEach((key) => {
        if (typeof e[key] === "object") {
          return result[key] = deepMerge(result[key], e[key]);
        }
        result[key] = e[key];
      });
    }
  });
  return result;
};
var isEmptyObject = function(obj) {
  return Object.getOwnPropertyNames(obj).length === 0;
};
var combineURLs = function(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};
function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
var buildURL = function(url, paramsObject) {
  if (!paramsObject || isEmptyObject(paramsObject))
    return url;
  let parts = [];
  Object.keys(paramsObject).forEach((key) => {
    parts.push(encode(key) + "=" + encode(paramsObject[key]));
  });
  return url += (url.indexOf("?") === -1 ? "?" : "&") + parts.join("&");
};
var isAbsoluteURL = function(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

// ../../../../../Documents/HBuilderProjects/graduateProject/pages/index/node_modules/uni-request/src/InterceptorManager.js
var InterceptorManager = class {
  constructor() {
    this.handlers = [];
  }
  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    });
    return this.handlers.length - 1;
  }
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  forEach(fn) {
    this.handlers.forEach((e) => {
      if (e !== null) {
        fn(e);
      }
    });
  }
};

// ../../../../../Documents/HBuilderProjects/graduateProject/pages/index/node_modules/uni-request/src/core/dispatchRequest.js
var dispatchRequest = function(config) {
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }
  config.url = buildURL(config.url, config.params);
  config.data = merge(
    config.data,
    config.transformRequest(config.data)
  );
  config.headers = merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );
  let methods = ["delete", "get", "head", "post", "put", "patch", "common"];
  methods.forEach((method) => {
    delete config.headers[method];
  });
  let promise = Promise.resolve(config);
  promise = promise.then((config2) => {
    return new Promise(function(resolve, reject) {
      let requestTask = uni.request({
        url: config2.url,
        data: config2.data || {},
        header: config2.headers,
        method: config2.method,
        dataType: config2.dataType,
        success: function(res) {
          resolve({
            data: res.data,
            headers: res.header,
            status: res.statusCode,
            statusText: "ok"
          });
        },
        fail: function(err) {
          reject(err);
        },
        complete: function() {
          config2.complete && config2.complete();
        }
      });
      if (config2.timeout && typeof config2.timeout === "number" && config2.timeout > 1e3) {
        setTimeout(() => {
          requestTask.abort();
          resolve({
            status: "canceled"
          });
        }, config2.timeout);
      }
    });
  });
  return promise;
};

// ../../../../../Documents/HBuilderProjects/graduateProject/pages/index/node_modules/uni-request/src/class.js
var Request = class {
  constructor(config) {
    this.defaults = config;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  request(config) {
    if (typeof config === "string") {
      config = merge({ url: arguments[0] }, arguments[1]);
    }
    config = deepMerge(this.defaults, config);
    config.method = config.method ? config.method.toLowerCase() : "get";
    let chain = [dispatchRequest, void 0];
    let promise = Promise.resolve(config);
    this.interceptors.request.forEach(function(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(function(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  all(promises) {
    return Promise.all(promises);
  }
};
["delete", "get", "head", "options", "trace"].forEach((method) => {
  Request.prototype[method] = function(url, config) {
    return this.request(merge(config || {}, {
      method,
      url
    }));
  };
});
["post", "put", "patch"].forEach((method) => {
  Request.prototype[method] = function(url, data, config) {
    return this.request(merge(config || {}, {
      method,
      url,
      data
    }));
  };
});
var class_default = Request;

// ../../../../../Documents/HBuilderProjects/graduateProject/pages/index/node_modules/uni-request/src/defaults.js
var DEFAULT_CONTENT_TYPE = {
  "Content-Type": "application/x-www-form-urlencoded"
};
var defaults = {
  method: "get",
  // default
  // baseURL: '',
  dataType: "json",
  responseType: "text",
  // timeout: 0,
  headers: {},
  // params : {},
  transformRequest(data) {
    return data;
  }
  // transformResponse (data) {
  //     return data;
  // },
  // validateStatus ( status ) {
  //     return status >= 200 && status < 300
  // }
};
defaults.headers = {
  common: {
    "Accept": "application/json, text/plain, */*"
  }
};
["delete", "get", "head", "post", "put", "patch"].map((e) => {
  defaults.headers[e] = merge(defaults.headers, DEFAULT_CONTENT_TYPE);
});
var defaults_default = defaults;

// ../../../../../Documents/HBuilderProjects/graduateProject/pages/index/node_modules/uni-request/src/request.js
function createInstance(config) {
  let context = new class_default(config);
  let instance = bind(class_default.prototype.request, context);
  extend(instance, class_default.prototype, context);
  extend(instance, context);
  return instance;
}
var request = createInstance(defaults_default);
request.create = function(config) {
  return createInstance(utils.merge(defaults_default, config));
};
request.spread = function(callback) {
  return function(...arg) {
    return callback.apply(null, [...arg]);
  };
};
var request_default = request;

// ../../../../../Documents/HBuilderProjects/graduateProject/pages/index/node_modules/uni-request/index.js
var uni_request_default = request_default;
export {
  uni_request_default as default
};
//# sourceMappingURL=uni-request.js.map
