function SxpressRouter() {
    this._request = null;
    this._response = null;
    this._routerList = [];
}

// 初始化
SxpressRouter.prototype.init = function (req, res) {
    this._request = req;
    this._response = res;
};

// get请求
SxpressRouter.prototype.get = function (path, callback) {
    var self = this;

    this._routerList.push({
        path: path,
        method: 'GET',
        handler: function () {
            callback(self._request, self._response)
        }
    });
};

// post请求
SxpressRouter.prototype.post = function (path, callback) {
    var self = this;
    
    this._routerList.push({
        path: path,
        method: 'POST',
        handler: function () {
            callback(self._request, self._response)
        }
    });
};

// put请求
SxpressRouter.prototype.put = function (path, callback) {
    var self = this;
    
    this._routerList.push({
        path: path,
        method: 'PUT',
        handler: function () {
            callback(self._request, self._response)
        }
    });
};

// delete请求
SxpressRouter.prototype.delete = function (path, callback) {
    var self = this;
    
    this._routerList.push({
        path: path,
        method: 'DELETE',
        handler: function () {
            callback(self._request, self._response)
        }
    });
};

module.exports = SxpressRouter;
