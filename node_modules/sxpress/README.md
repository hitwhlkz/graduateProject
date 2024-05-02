sxpress for nodejs

#### index.js
```javascript
// 示例
var path = require('path');
var sxpress = require('sxpress');
var cookieParser = require('sxpress-cookie-parser');
var session = require('sxpress-session');
var app = sxpress();
var userRouter = require('./routers/user');

app.use(cookieParser());
app.use(
  session({
    name: 'sxpressId',
    secret: 'cmc secret',
    cookie: {
      domain: '.01zhuanche.com',
    },
  })
);

app.use(function (req, res, next) {
  req.session.account = 'baie';

  next();
});

app.use(function (req, res, next) {
  console.log('session', req.session);
  console.log('cookies', req.cookies);

  next();
});

app.use(function (req, res, next) {
  req.middle1 = true;

  next();
});

app.static(path.join(__dirname, 'public'));

app.get('/test', function (req, res) {
  res.send('app.get: /test');
});

app.use(userRouter);

app.listen(80, () => {
  console.log('sxpress running at 80 port');
});
```


#### ./routers/user.js
```javascript
var sxpress = require('sxpress');
var app = new sxpress();

var router = app.Router();

router.get('/user', function (req, res) {
  res.send('router.get: /user');
});
```