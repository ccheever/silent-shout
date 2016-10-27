'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startAsync = exports.app = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var startAsync = exports.startAsync = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(port) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            port = port || 3000;
            app.listen(port, function () {
              console.log("Server started on port", port);
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function startAsync(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.addUser = addUser;
exports.addPost = addPost;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _promisePrint = require('promise-print');

var _promisePrint2 = _interopRequireDefault(_promisePrint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = exports.app = (0, _express2.default)();

var post1 = {
  id: 'post:1',
  userId: 'ccheever',
  message: "Hello world",
  postTime: 1477539803158
};
var post2 = {
  id: 'post:2',
  userId: 'fsc',
  message: "Need anything from the store?",
  postTime: 1477539811381
};
var DATA = {
  POSTS: {
    'post:1': post1,
    'post:2': post2
  },
  USERS: {
    ccheever: {
      id: 'ccheever',
      name: 'Charlie Cheever',
      photoUrl: 'http://www.incimages.com/uploaded_files/image/1940x900/charlie-cheever-quora-pan_20353.jpg'
    },
    fsc: {
      id: 'fsc',
      name: 'Francie Cheever',
      photoUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/6/005/0a2/1ca/29d9837.jpg'
    }
  },
  LIST_OF_POSTS: [post2, post1]
};

app.get('/', function (req, res) {
  res.send(JSON.stringify(DATA));
});

app.get('/posts', function (req, res) {
  res.send(JSON.stringify(DATA.LIST_OF_POSTS));
});

app.get('/users', function (req, res) {
  res.send(JSON.stringify(DATA.USERS));
});

function addUser(props) {
  var id = props.id,
      name = props.name,
      photoUrl = props.photoUrl;

  var user = { id: id, name: name, photoUrl: photoUrl };
  DATA.USERS[user.id] = user;
  return user;
}

function addPost(props) {
  var id = props.id,
      userId = props.userId,
      message = props.message;

  var post = { id: id, userId: userId, message: message };
  post.postTime = Date.now();
  DATA.POSTS[post.id] = post;
  DATA.LIST_OF_POSTS.unshift(post);
}

app.all('/create_user', function (req, res) {
  var user = addUser(req.query);
  res.send(JSON.stringify(user));
});

app.all('/create_post', function (req, res) {
  var post = addPost(req.query);
  res.send(JSON.stringify(post));
});

if (require.main === module) {
  (0, _promisePrint2.default)(startAsync(process.argv[2]));
}

exports.default = startAsync;
//# sourceMappingURL=index.js.map