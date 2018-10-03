require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 93);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nconf = __webpack_require__(88);

var _nconf2 = _interopRequireDefault(_nconf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _nconf2.default.argv().env('__') // custom delimiter for nested properties
.file(__dirname + '/../config/constants.json'); /**
                                                 * Sets up environment-specific configuration
                                                 * @module config
                                                 * @requires nconf
                                                 */

exports.default = config;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-css-modules");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    margin: 5rem 2rem;\n  '], ['\n    margin: 5rem 2rem;\n  ']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(4);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styleUtils = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents2.default.div.withConfig({
  displayName: 'Error__Container',
  componentId: 'sc-1kxmym9-0'
})(['margin:5rem;text-align:center;font-size:2rem;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";', ''], _styleUtils.media.phoneMax(_templateObject));

function Error() {
  return _react2.default.createElement(
    Container,
    null,
    _react2.default.createElement(
      'div',
      { styleName: 'message' },
      '500 error, our apologies.'
    ),
    _react2.default.createElement(
      'div',
      { styleName: 'message' },
      'This error is the engineer\'s fault.'
    )
  );
}

exports.default = Error;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(4);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = _styledComponents2.default.div.withConfig({
  displayName: 'Header__Container',
  componentId: 'sc-1clzo1-0'
})(['margin:3rem 2rem 2rem;font-size:1.1rem;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";text-align:center;']);

function Header(_ref) {
  var summary = _ref.summary;

  return _react2.default.createElement(
    Container,
    null,
    summary
  );
}

exports.default = Header;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(4);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Container = _styledComponents2.default.div.withConfig({
  displayName: 'Loader__Container',
  componentId: 'oeo9ck-0'
})(['width:50px;margin:7rem auto 0;']);

function Loader() {
  return _react2.default.createElement(
    Container,
    null,
    _react2.default.createElement(
      'svg',
      { version: '1.1', id: 'loader-1', xmlns: 'http://www.w3.org/2000/svg', x: '0px', y: '0px',
        width: '50px', height: '50px', viewBox: '0 0 50 50' },
      _react2.default.createElement(
        'path',
        { fill: '#004741', d: 'M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z' },
        _react2.default.createElement('animateTransform', { attributeType: 'xml',
          attributeName: 'transform',
          type: 'rotate',
          from: '0 25 25',
          to: '360 25 25',
          dur: '0.6s',
          repeatCount: 'indefinite' })
      )
    )
  );
}

exports.default = Loader;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _awsDynamodb = __webpack_require__(82);

var _awsDynamodb2 = _interopRequireDefault(_awsDynamodb);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamoDB = (0, _awsDynamodb2.default)({
  accessKeyId: _constants2.default.get('DB_ACCESS_KEY_ID'),
  secretAccessKey: _constants2.default.get('DB_SECRET_ACCESS_KEY'),
  region: _constants2.default.get('DB_REGION')
});

exports.default = dynamoDB;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.media = undefined;

var _templateObject = _taggedTemplateLiteral(['\n      padding: .5rem;\n      margin: 0;\n      font-size: 1.2rem;\n    '], ['\n      padding: .5rem;\n      margin: 0;\n      font-size: 1.2rem;\n    ']);

exports.shadow = shadow;
exports.card = card;

var _styledComponents = __webpack_require__(4);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var media = exports.media = {
  tabletMax: function tabletMax() {
    return (0, _styledComponents.css)(['@media (max-width:899px){', '}'], _styledComponents.css.apply(undefined, arguments));
  },
  phoneMax: function phoneMax() {
    return (0, _styledComponents.css)(['@media (max-width:599px){', '}'], _styledComponents.css.apply(undefined, arguments));
  }
};

function shadow() {
  return (0, _styledComponents.css)(['box-shadow:0 2px 2px 0 rgba(0,0,0,0.16);']);
}

function card() {
  return (0, _styledComponents.css)(['background-color:white;padding:1.25rem;border-radius:2px;font-size:1.3rem;margin:auto 1.5rem;', ''], media.phoneMax(_templateObject));
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyResponse = verifyResponse;
function verifyResponse(res) {
  if (!Array.isArray(res)) {
    throw new Error('DB response was not the expected type: Array');
  }
  if (!res.length) {
    throw new Error('DB returned an empty array.');
  }
  return res;
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;
function formatDate(date) {
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  var formattedDate = day + ' ' + monthNames[monthIndex] + ' ' + year;

  return formattedDate;
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAbout = exports.fetchAbout = undefined;

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _constants = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchAbout = exports.fetchAbout = function fetchAbout() {
  return {
    type: _constants.ABOUT_FETCH,
    payload: _axios2.default.get('/api/about')
  };
};

var addAbout = exports.addAbout = function addAbout(data) {
  return {
    type: _constants.ABOUT_ADD,
    payload: data
  };
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ABOUT_FETCH = exports.ABOUT_FETCH = 'ABOUT_FETCH';
var ABOUT_ADD = exports.ABOUT_ADD = 'ABOUT_ADD';

var ABOUT_FETCH_PENDING = exports.ABOUT_FETCH_PENDING = 'ABOUT_FETCH_PENDING';
var ABOUT_FETCH_FULFILLED = exports.ABOUT_FETCH_FULFILLED = 'ABOUT_FETCH_FULFILLED';
var ABOUT_FETCH_REJECTED = exports.ABOUT_FETCH_REJECTED = 'ABOUT_FETCH_REJECTED';

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPosts = exports.addPosts = undefined;

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _constants = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addPosts = exports.addPosts = function addPosts(posts) {
  return {
    type: _constants.POSTS_ADD,
    payload: posts
  };
};

var fetchPosts = exports.fetchPosts = function fetchPosts() {
  return {
    type: _constants.POSTS_FETCH,
    payload: _axios2.default.get('/api/posts')
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var POSTS_FETCH = exports.POSTS_FETCH = 'POSTS_FETCH';

var POSTS_ADD = exports.POSTS_ADD = 'POSTS_ADD';

var POSTS_FETCH_PENDING = exports.POSTS_FETCH_PENDING = 'POSTS_FETCH_PENDING';
var POSTS_FETCH_FULFILLED = exports.POSTS_FETCH_FULFILLED = 'POSTS_FETCH_FULFILLED';
var POSTS_FETCH_REJECTED = exports.POSTS_FETCH_REJECTED = 'POSTS_FETCH_REJECTED';

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchProjects = exports.addProjects = undefined;

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _constants = __webpack_require__(21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addProjects = exports.addProjects = function addProjects(projects) {
  return {
    type: _constants.PROJECTS_ADD,
    payload: projects
  };
};

var fetchProjects = exports.fetchProjects = function fetchProjects() {
  return {
    type: _constants.PROJECTS_FETCH,
    payload: _axios2.default.get('/api/projects')
  };
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PROJECTS_FETCH = exports.PROJECTS_FETCH = 'PROJECTS_FETCH';

var PROJECTS_FETCH_PENDING = exports.PROJECTS_FETCH_PENDING = 'PROJECTS_FETCH_PENDING';
var PROJECTS_FETCH_FULFILLED = exports.PROJECTS_FETCH_FULFILLED = 'PROJECTS_FETCH_FULFILLED';
var PROJECTS_FETCH_REJECTED = exports.PROJECTS_FETCH_REJECTED = 'PROJECTS_FETCH_REJECTED';

var PROJECTS_ADD = exports.PROJECTS_ADD = 'PROJECTS_ADD';

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchReadings = exports.addReadings = undefined;

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _constants = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addReadings = exports.addReadings = function addReadings(readings) {
  return {
    type: _constants.READINGS_ADD,
    payload: readings
  };
};

var fetchReadings = exports.fetchReadings = function fetchReadings() {
  return {
    type: _constants.READINGS_FETCH,
    payload: _axios2.default.get('/api/readings')
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var READINGS_FETCH = exports.READINGS_FETCH = 'READINGS_FETCH';

var READINGS_ADD = exports.READINGS_ADD = 'READINGS_ADD';

var READINGS_FETCH_PENDING = exports.READINGS_FETCH_PENDING = 'READINGS_FETCH_PENDING';
var READINGS_FETCH_FULFILLED = exports.READINGS_FETCH_FULFILLED = 'READINGS_FETCH_FULFILLED';
var READINGS_FETCH_REJECTED = exports.READINGS_FETCH_REJECTED = 'READINGS_FETCH_REJECTED';

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = undefined;

var _db = __webpack_require__(9);

var _db2 = _interopRequireDefault(_db);

var _utils = __webpack_require__(12);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reverseSortResponseByVersion(res) {
  return res.sort(function (a, b) {
    // if either item does not have a valid version property, sort that item as less important
    if (!a.version || !Number.isInteger(a.version)) {
      return 1;
    }
    if (!b.version || !Number.isInteger(b.version)) {
      return -1;
    }
    return b.version - a.version;
  });
}

var get = exports.get = function get() {
  return _db2.default.table(_constants2.default.get('DB_TABLE_ABOUT')).scan().then(function (res) {
    (0, _utils.verifyResponse)(res);
    // return the most recent version
    return reverseSortResponseByVersion(res)[0];
  });
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = undefined;

var _jsonwebtoken = __webpack_require__(31);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACCESSTOKENCOOKIE = _constants2.default.get('accessTokenCookie');
var SECRET = _constants2.default.get('secret');

var verify = exports.verify = function verify(req) {
  return new Promise(function (resolve, reject) {
    var jWT = req.cookies[ACCESSTOKENCOOKIE];

    if (!jWT) {
      reject(new Error('JWT is invalid!'));
    } else {
      try {
        _jsonwebtoken2.default.verify(jWT, SECRET);
        resolve();
      } catch (err) {
        reject(err);
      }
    }
  });
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = undefined;

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = exports.get = function get() {
  var headers = { 'Accept': 'application/json' };

  return _axios2.default.get('https://medium.com/' + _constants2.default.get('MEDIUM_USERNAME') + '/latest', { headers: headers }).then(function (_ref) {
    var data = _ref.data;

    // the first 16 characters of the response are unnusable giberish
    var cleanedData = data.substring(16);

    var jsonifiedData = JSON.parse(cleanedData);
    var postsObject = jsonifiedData.payload.references.Post;

    return Object.keys(postsObject).map(function (key) {
      return postsObject[key];
    });
  });
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = undefined;

var _db = __webpack_require__(9);

var _db2 = _interopRequireDefault(_db);

var _utils = __webpack_require__(12);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get = exports.get = function get() {
  return _db2.default.table(_constants2.default.get('DB_TABLE_PROJECTS')).scan().then(_utils.verifyResponse);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = exports.add = undefined;

var _db = __webpack_require__(9);

var _db2 = _interopRequireDefault(_db);

var _utils = __webpack_require__(12);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var add = exports.add = function add(data) {
  return _db2.default.table(_constants2.default.get('DB_TABLE_READINGS')).insert(data);
};

var get = exports.get = function get() {
  return _db2.default.table(_constants2.default.get('DB_TABLE_READINGS')).scan().then(_utils.verifyResponse);
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"shadow":"src-client-components-common__shadow--3mB6G","card":"src-client-components-common__card--3uHoO","flex-container":"src-client-components-common__flex-container--Wz-G0","card-link":"src-client-components-common__card-link--3l8LU","title":"src-client-components-common__title--OKQVG","details":"src-client-components-common__details--qW__c","quote":"src-client-components-common__quote--3GQhJ"};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(13);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(84);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = __webpack_require__(85);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _helmet = __webpack_require__(86);

var _helmet2 = _interopRequireDefault(_helmet);

var _routes = __webpack_require__(76);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// helps secure Express with various HTTP headers
app.use((0, _helmet2.default)());

app.use((0, _cookieParser2.default)());

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.set('port', process.env.PORT || 1986);

app.use(_express2.default.static(__dirname));

app.use(_bodyParser2.default.json());

// define routes
app.use(_routes2.default);

// start the server
app.listen(app.get('port'), function () {
  console.log('ready on port ' + app.get('port'));
});

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n    height: 14rem;\n  '], ['\n    height: 14rem;\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    margin: 0 .75rem;\n  '], ['\n    margin: 0 .75rem;\n  ']),
    _templateObject3 = _taggedTemplateLiteral(['\n    background-position-x: 16rem, -3rem;\n    background-position-y: -11rem, 0rem;\n    background-size: 45rem, 22rem;\n  '], ['\n    background-position-x: 16rem, -3rem;\n    background-position-y: -11rem, 0rem;\n    background-size: 45rem, 22rem;\n  ']),
    _templateObject4 = _taggedTemplateLiteral(['\n    background-blend-mode: color-burn, lighten;\n    background-position-x: 0rem;\n    background-position-y: 50%;\n    background-size: 125%;\n  '], ['\n    background-blend-mode: color-burn, lighten;\n    background-position-x: 0rem;\n    background-position-y: 50%;\n    background-size: 125%;\n  ']),
    _templateObject5 = _taggedTemplateLiteral(['\n    margin-top: 2rem;\n  '], ['\n    margin-top: 2rem;\n  ']),
    _templateObject6 = _taggedTemplateLiteral(['\n    justify-content: space-around;\n  '], ['\n    justify-content: space-around;\n  ']),
    _templateObject7 = _taggedTemplateLiteral(['\n    margin: 0 1.5rem;\n  '], ['\n    margin: 0 1.5rem;\n  ']),
    _templateObject8 = _taggedTemplateLiteral(['\n    margin: .5rem;\n  '], ['\n    margin: .5rem;\n  ']),
    _templateObject9 = _taggedTemplateLiteral(['\n    margin: 2rem 1.5rem;\n  '], ['\n    margin: 2rem 1.5rem;\n  ']),
    _templateObject10 = _taggedTemplateLiteral(['\n    margin: 2rem .75rem;\n  '], ['\n    margin: 2rem .75rem;\n  ']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(4);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styleUtils = __webpack_require__(11);

var _reactHelmet = __webpack_require__(10);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Header = __webpack_require__(7);

var _Header2 = _interopRequireDefault(_Header);

var _Loader = __webpack_require__(8);

var _Loader2 = _interopRequireDefault(_Loader);

var _Error = __webpack_require__(6);

var _Error2 = _interopRequireDefault(_Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LogoContainer = _styledComponents2.default.div.withConfig({
  displayName: 'About__LogoContainer',
  componentId: 'gb0ggz-0'
})(['', ' height:15rem;margin:0 1.5rem;', ' ', ''], (0, _styleUtils.shadow)(), _styleUtils.media.tabletMax(_templateObject), _styleUtils.media.phoneMax(_templateObject2));

var BackgroundImage = _styledComponents2.default.div.withConfig({
  displayName: 'About__BackgroundImage',
  componentId: 'gb0ggz-1'
})(['background-image:url("', '"),url("', '");background-repeat:no-repeat,no-repeat;background-color:#e7eeed;background-blend-mode:color-burn,color-burn;height:100%;width:100%;background-position-x:24rem,-3rem;background-position-y:-20rem,-5rem;background-size:70rem,30rem;', ' ', ''], function (props) {
  return props.imageUrl;
}, function (props) {
  return props.imageUrl;
}, _styleUtils.media.tabletMax(_templateObject3), _styleUtils.media.phoneMax(_templateObject4));

function renderLogo(imageUrl) {
  return _react2.default.createElement(
    LogoContainer,
    null,
    _react2.default.createElement(BackgroundImage, { imageUrl: imageUrl })
  );
}

var LinksContainer = _styledComponents2.default.div.withConfig({
  displayName: 'About__LinksContainer',
  componentId: 'gb0ggz-2'
})(['font-size:1.25rem;text-align:center;display:flex;flex-wrap:wrap;justify-content:center;', ' ', ''], _styleUtils.media.tabletMax(_templateObject5), _styleUtils.media.phoneMax(_templateObject6));

var LinkItem = _styledComponents2.default.li.withConfig({
  displayName: 'About__LinkItem',
  componentId: 'gb0ggz-3'
})(['display:inline;margin:2rem;', ' ', ''], _styleUtils.media.tabletMax(_templateObject7), _styleUtils.media.phoneMax(_templateObject8));

var Link = _styledComponents2.default.a.withConfig({
  displayName: 'About__Link',
  componentId: 'gb0ggz-4'
})(['color:black;:link{color:black;}:visited{color:black;}']);

function renderLinks(linksArray) {
  return _react2.default.createElement(
    LinksContainer,
    null,
    linksArray.map(function (_ref) {
      var name = _ref.name,
          url = _ref.url;
      return _react2.default.createElement(
        LinkItem,
        { key: name },
        _react2.default.createElement(
          Link,
          { href: url, target: '_blank' },
          name
        )
      );
    })
  );
}

var BioCard = _styledComponents2.default.div.withConfig({
  displayName: 'About__BioCard',
  componentId: 'gb0ggz-5'
})(['', ' ', ' font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";text-align:justify;font-size:1.15rem;', ' ', ''], (0, _styleUtils.shadow)(), (0, _styleUtils.card)(), _styleUtils.media.tabletMax(_templateObject9), _styleUtils.media.phoneMax(_templateObject10));

function renderBio(bio) {
  return _react2.default.createElement(BioCard, { dangerouslySetInnerHTML: { __html: bio } });
}

var AboutContainer = _styledComponents2.default.div.withConfig({
  displayName: 'About__AboutContainer',
  componentId: 'gb0ggz-6'
})(['font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";']);

var About = function (_React$Component) {
  _inherits(About, _React$Component);

  function About() {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
  }

  _createClass(About, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.data) {
        this.props.fetchAbout();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          isLoading = _props.isLoading,
          error = _props.error;

      var content = void 0;

      if (data) {
        content = _react2.default.createElement(
          AboutContainer,
          null,
          data.title ? _react2.default.createElement(_Header2.default, { summary: data.title }) : null,
          data.pictureURL ? renderLogo(data.pictureURL) : null,
          data.links ? renderLinks(data.links) : null,
          data.bio ? renderBio(data.bio) : null
        );
      } else if (isLoading) {
        content = _react2.default.createElement(_Loader2.default, null);
      } else if (error) {
        // @todo reroute to 5xx view
        content = _react2.default.createElement(_Error2.default, null);
      } else {
        content = null;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactHelmet2.default,
          null,
          _react2.default.createElement(
            'title',
            null,
            'dslama.net - about'
          )
        ),
        content
      );
    }
  }]);

  return About;
}(_react2.default.Component);

exports.default = About;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(5);

var _actions = __webpack_require__(16);

var _About = __webpack_require__(35);

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapStateToProps(state) {
  if (state.about.isLoading) {
    return {
      isLoading: true
    };
  } else if (state.about.error) {
    // @todo log error
    return {
      error: true
    };
  } else if (state.about.isFetched) {
    return {
      data: state.about.data
    };
  } else {
    return {};
  }
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { fetchAbout: _actions.fetchAbout })(_About2.default);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Edit = function (_React$Component) {
  _inherits(Edit, _React$Component);

  function Edit() {
    _classCallCheck(this, Edit);

    return _possibleConstructorReturn(this, (Edit.__proto__ || Object.getPrototypeOf(Edit)).apply(this, arguments));
  }

  _createClass(Edit, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'Editing the about page!!'
      );
    }
  }]);

  return Edit;
}(_react2.default.Component);

exports.default = Edit;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AboutContainer = __webpack_require__(36);

var _AboutContainer2 = _interopRequireDefault(_AboutContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AboutParentContainer = function (_React$Component) {
  _inherits(AboutParentContainer, _React$Component);

  function AboutParentContainer() {
    _classCallCheck(this, AboutParentContainer);

    return _possibleConstructorReturn(this, (AboutParentContainer.__proto__ || Object.getPrototypeOf(AboutParentContainer)).apply(this, arguments));
  }

  _createClass(AboutParentContainer, [{
    key: 'render',
    value: function render() {
      var editAboutComponent = this.props.children;


      return editAboutComponent || _react2.default.createElement(_AboutContainer2.default, null);
    }
  }]);

  return AboutParentContainer;
}(_react2.default.Component);

exports.default = AboutParentContainer;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(3);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _classnames = __webpack_require__(30);

var _classnames2 = _interopRequireDefault(_classnames);

var _hamburger = __webpack_require__(77);

var _hamburger2 = _interopRequireDefault(_hamburger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hamburger = function (_React$Component) {
  _inherits(Hamburger, _React$Component);

  function Hamburger() {
    _classCallCheck(this, Hamburger);

    return _possibleConstructorReturn(this, (Hamburger.__proto__ || Object.getPrototypeOf(Hamburger)).apply(this, arguments));
  }

  _createClass(Hamburger, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onMenuClick = _props.onMenuClick,
          expanded = _props.expanded;


      var isActive = (0, _classnames2.default)({
        active: expanded
      }, 'mobile', 'hamburger');

      return _react2.default.createElement(
        'div',
        { onClick: onMenuClick, styleName: isActive },
        _react2.default.createElement('span', { styleName: 'line' }),
        _react2.default.createElement('span', { styleName: 'line' }),
        _react2.default.createElement('span', { styleName: 'line' })
      );
    }
  }]);

  return Hamburger;
}(_react2.default.Component);

exports.default = (0, _reactCssModules2.default)(Hamburger, _hamburger2.default, { allowMultiple: true });

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(14);

var _navbar = __webpack_require__(41);

var _navbar2 = _interopRequireDefault(_navbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBarContainer = function (_React$Component) {
  _inherits(NavBarContainer, _React$Component);

  function NavBarContainer(props) {
    _classCallCheck(this, NavBarContainer);

    var _this = _possibleConstructorReturn(this, (NavBarContainer.__proto__ || Object.getPrototypeOf(NavBarContainer)).call(this, props));

    _this._onMenuClick = _this._onMenuClick.bind(_this);
    _this._onLinkClick = _this._onLinkClick.bind(_this);

    _this.state = {
      expanded: false
    };
    return _this;
  }

  _createClass(NavBarContainer, [{
    key: '_onMenuClick',
    value: function _onMenuClick() {
      this.setState({ expanded: !this.state.expanded });
    }
  }, {
    key: '_onLinkClick',
    value: function _onLinkClick(item) {
      var path = item.toLowerCase();

      this.setState({
        expanded: false,
        activeItem: path
      });

      _reactRouter.browserHistory.push('/' + path);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      // set the activeItem i.e. active view
      var _props = this.props,
          currentPath = _props.currentPath,
          menuItems = _props.menuItems;


      var activeItem = currentPath.split('/')[1];

      activeItem = activeItem ? activeItem.toLowerCase() : menuItems[0].toLowerCase();

      this.setState({ activeItem: activeItem });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          title = _props2.title,
          menuItems = _props2.menuItems;

      return _react2.default.createElement(_navbar2.default, {
        title: title,
        activeItem: this.state.activeItem,
        expanded: this.state.expanded,
        onMenuClick: this._onMenuClick,
        onLinkClick: this._onLinkClick,
        menuItems: menuItems
      });
    }
  }]);

  return NavBarContainer;
}(_react2.default.Component);

exports.default = NavBarContainer;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(30);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssModules = __webpack_require__(3);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _Hamburger = __webpack_require__(39);

var _Hamburger2 = _interopRequireDefault(_Hamburger);

var _navbar = __webpack_require__(78);

var _navbar2 = _interopRequireDefault(_navbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = function (_React$Component) {
  _inherits(NavBar, _React$Component);

  function NavBar() {
    _classCallCheck(this, NavBar);

    return _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).apply(this, arguments));
  }

  _createClass(NavBar, [{
    key: '_generateItemClasses',
    value: function _generateItemClasses(items) {
      var activeItem = this.props.activeItem;


      var itemSelected = {};

      items.forEach(function (item) {
        itemSelected[item] = (0, _classnames2.default)('link', { 'active': activeItem === item.toLowerCase() });
      });

      return itemSelected;
    }
  }, {
    key: '_renderMenuItem',
    value: function _renderMenuItem(item, styleName) {
      var onLinkClick = this.props.onLinkClick;


      function _onLinkClick(item) {
        onLinkClick(item);
      }

      return _react2.default.createElement(
        'span',
        { key: item, onClick: _onLinkClick.bind(this, item), styleName: styleName },
        item
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          title = _props.title,
          menuItems = _props.menuItems,
          expanded = _props.expanded,
          onMenuClick = _props.onMenuClick;


      var conditionalShow = (0, _classnames2.default)(_defineProperty({}, _navbar2.default['show'], expanded));

      var itemsClasses = this._generateItemClasses(menuItems);
      var navbarItems = menuItems.map(function (item) {
        return _this2._renderMenuItem(item, itemsClasses[item]);
      });

      return _react2.default.createElement(
        'div',
        { styleName: 'outer-container shadow' },
        _react2.default.createElement(
          'span',
          { styleName: 'middle-container' },
          _react2.default.createElement(
            'span',
            null,
            title
          ),
          _react2.default.createElement(_Hamburger2.default, { onMenuClick: onMenuClick, expanded: expanded })
        ),
        _react2.default.createElement(
          'span',
          { styleName: 'inner-container', className: conditionalShow },
          navbarItems
        )
      );
    }
  }]);

  return NavBar;
}(_react2.default.Component);

exports.default = (0, _reactCssModules2.default)(NavBar, _navbar2.default, { allowMultiple: true });

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n    padding: 0;\n    left: 0;\n    right: 0;\n  '], ['\n    padding: 0;\n    left: 0;\n    right: 0;\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    padding: 1rem .75rem 3rem;\n  '], ['\n    padding: 1rem .75rem 3rem;\n  ']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(4);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Navbar = __webpack_require__(40);

var _Navbar2 = _interopRequireDefault(_Navbar);

var _styleUtils = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var OuterContainer = _styledComponents2.default.div.withConfig({
  displayName: 'Layout__OuterContainer',
  componentId: 'sc-1m1rryv-0'
})(['padding:0 1.5%;background-color:#e7eeed;position:absolute;min-height:100%;left:12%;right:12%;', ''], _styleUtils.media.tabletMax(_templateObject));

var Footer = _styledComponents2.default.div.withConfig({
  displayName: 'Layout__Footer',
  componentId: 'sc-1m1rryv-1'
})(['font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";padding:5rem 0 3rem;color:rgba(0,0,0,.4);font-size:.75rem;text-align:center;', ''], _styleUtils.media.tabletMax(_templateObject2));

var Link = _styledComponents2.default.a.withConfig({
  displayName: 'Layout__Link',
  componentId: 'sc-1m1rryv-2'
})(['color:inherit;']);

var Layout = function (_React$Component) {
  _inherits(Layout, _React$Component);

  function Layout(props) {
    _classCallCheck(this, Layout);

    var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));

    _this.menuItems = ['about', 'posts', 'projects', 'readings'];

    _this.title = 'dean slama';
    return _this;
  }

  _createClass(Layout, [{
    key: 'render',
    value: function render() {
      var pathname = this.props.location.pathname;


      return _react2.default.createElement(
        OuterContainer,
        null,
        _react2.default.createElement(_Navbar2.default, {
          currentPath: pathname,
          title: this.title,
          menuItems: this.menuItems
        }),
        this.props.children,
        _react2.default.createElement(
          Footer,
          null,
          'Feel free to ',
          _react2.default.createElement(
            Link,
            { href: 'https://github.com/deanslamajr/deanslamajr.com', target: '_blank' },
            'fork this spa'
          ),
          ' and host it!'
        )
      );
    }
  }]);

  return Layout;
}(_react2.default.Component);

exports.default = Layout;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(3);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _login = __webpack_require__(79);

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUCCESS = 'success';
var FAILURE = 'failure';
var LOGGEDOUT = 'logged out';
var AUTHENTICATED = 'authenticated';
var NOTAUTHENTICATED = 'not authenticated';

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.state = {
      username: '',
      password: '',
      loginResult: '',
      authenticated: ''
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.checkAuthentication = _this.checkAuthentication.bind(_this);
    _this.logout = _this.logout.bind(_this);
    return _this;
  }

  _createClass(Login, [{
    key: 'handleChange',
    value: function handleChange(type, event) {
      this.setState(_defineProperty({}, type, event.target.value));
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _this2 = this;

      // prevent page refresh
      event.preventDefault();

      _axios2.default.post('/login', { username: this.state.username, password: this.state.password }).then(function (res) {
        _this2.setState({
          loginResult: SUCCESS,
          authenticated: AUTHENTICATED
        });
      }).catch(function () {
        // @todo log error
        _this2.setState({ loginResult: FAILURE });
      });
    }
  }, {
    key: 'renderLoginResultDiv',
    value: function renderLoginResultDiv() {
      return this.state.loginResult ? _react2.default.createElement(
        'a',
        { styleName: 'form-input form-text', onClick: this.checkAuthentication },
        this.state.loginResult,
        '!'
      ) : null;
    }
  }, {
    key: 'checkAuthentication',
    value: function checkAuthentication() {
      var _this3 = this;

      _axios2.default.get('/status/authentication').then(function (res) {
        _this3.setState({ authenticated: AUTHENTICATED });
      }).catch(function () {
        // @todo log error
        _this3.setState({ authenticated: NOTAUTHENTICATED });
      });
    }
  }, {
    key: 'renderAuthenticationCheckDiv',
    value: function renderAuthenticationCheckDiv() {
      var authState = this.state.authenticated;
      return _react2.default.createElement(
        'div',
        { styleName: 'form-input form-text auth-div' },
        _react2.default.createElement(
          'div',
          null,
          authState
        ),
        authState === AUTHENTICATED ? _react2.default.createElement(
          'button',
          { onClick: this.logout },
          'Logout'
        ) : null
      );
    }
  }, {
    key: 'logout',
    value: function logout() {
      var _this4 = this;

      // revert login&auth state
      this.setState({
        loginResult: '',
        authenticated: ''
      });

      _axios2.default.post('/logout').then(function (res) {
        _this4.setState({ loginResult: LOGGEDOUT });
      }).catch(function () {
        // @todo log error
        _this4.setState({ loginResult: FAILURE });
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkAuthentication();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { styleName: 'container', onSubmit: this.handleSubmit },
        this.renderAuthenticationCheckDiv(),
        _react2.default.createElement('input', { type: 'text', onChange: this.handleChange.bind(this, 'username'), placeholder: 'username', styleName: 'form-input' }),
        _react2.default.createElement('input', { type: 'password', onChange: this.handleChange.bind(this, 'password'), placeholder: 'password', styleName: 'form-input' }),
        _react2.default.createElement('input', { type: 'submit', value: 'Login', styleName: 'form-input' }),
        this.renderLoginResultDiv()
      );
    }
  }]);

  return Login;
}(_react2.default.Component);

exports.default = (0, _reactCssModules2.default)(Login, _login2.default, { allowMultiple: true });

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(3);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _common = __webpack_require__(29);

var _common2 = _interopRequireDefault(_common);

var _helpers = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Post(_ref) {
  var data = _ref.data;

  var mediumUser = process.env.mediumUser;
  var postURL = 'https://medium.com/' + mediumUser + '/' + data.uniqueSlug;

  var date = new Date(data.firstPublishedAt);
  var publishDate = (0, _helpers.formatDate)(date);

  return _react2.default.createElement(
    'div',
    { styleName: 'flex-container' },
    _react2.default.createElement(
      'a',
      {
        styleName: 'card-link',
        href: postURL,
        target: '_blank' },
      _react2.default.createElement(
        'div',
        { styleName: 'card shadow' },
        _react2.default.createElement(
          'div',
          { styleName: 'title' },
          data.title
        ),
        _react2.default.createElement(
          'div',
          { styleName: 'details' },
          _react2.default.createElement(
            'div',
            null,
            publishDate
          )
        ),
        _react2.default.createElement(
          'div',
          { styleName: 'quote' },
          data.previewContent.bodyModel.paragraphs[1].text
        )
      )
    )
  );
}

exports.default = (0, _reactCssModules2.default)(Post, _common2.default, { allowMultiple: true });

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(10);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Header = __webpack_require__(7);

var _Header2 = _interopRequireDefault(_Header);

var _Loader = __webpack_require__(8);

var _Loader2 = _interopRequireDefault(_Loader);

var _Error = __webpack_require__(6);

var _Error2 = _interopRequireDefault(_Error);

var _Post = __webpack_require__(44);

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var summary = 'This is a list of blog posts authored by the developer. Most recently published posts are nearer the top.';

var PostList = function (_React$Component) {
  _inherits(PostList, _React$Component);

  function PostList() {
    _classCallCheck(this, PostList);

    return _possibleConstructorReturn(this, (PostList.__proto__ || Object.getPrototypeOf(PostList)).apply(this, arguments));
  }

  _createClass(PostList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.data) {
        this.props.fetchPosts();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          isLoading = _props.isLoading,
          error = _props.error;

      var content = void 0;

      if (data && data.length) {
        content = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Header2.default, { summary: summary }),
          data.map(function (postData) {
            return _react2.default.createElement(_Post2.default, { key: postData.id, data: postData });
          })
        );
      } else if (isLoading) {
        content = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Header2.default, { summary: summary }),
          _react2.default.createElement(_Loader2.default, null)
        );
      } else if (error) {
        // @todo reroute to 5xx view
        content = _react2.default.createElement(_Error2.default, null);
      } else {
        content = null;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactHelmet2.default,
          null,
          _react2.default.createElement(
            'title',
            null,
            'dslama.net - posts'
          )
        ),
        content
      );
    }
  }]);

  return PostList;
}(_react2.default.Component);

exports.default = PostList;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(5);

var _actions = __webpack_require__(18);

var _PostList = __webpack_require__(45);

var _PostList2 = _interopRequireDefault(_PostList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapStateToProps(state) {
  if (state.posts.isLoading) {
    return {
      isLoading: true
    };
  } else if (state.posts.error) {
    // @todo log error
    return {
      error: true
    };
  } else if (state.posts.isFetched) {
    return {
      data: state.posts.data
    };
  } else {
    return {};
  }
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { fetchPosts: _actions.fetchPosts })(_PostList2.default);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(3);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _project = __webpack_require__(80);

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Project(_ref) {
  var cardData = _ref.cardData;

  return _react2.default.createElement(
    'div',
    { key: cardData.id, styleName: 'flex-container' },
    _react2.default.createElement(
      'div',
      { styleName: 'card shadow' },
      _react2.default.createElement(
        'div',
        { styleName: 'title' },
        _react2.default.createElement(
          'a',
          { href: cardData.url, target: '_blank', styleName: 'project-link' },
          cardData.name
        ),
        '-',
        _react2.default.createElement(
          'a',
          { href: cardData.source, target: '_blank', styleName: 'source-link' },
          'source'
        )
      ),
      _react2.default.createElement(
        'div',
        { styleName: 'description' },
        cardData.description
      ),
      _react2.default.createElement('div', { styleName: 'quote', dangerouslySetInnerHTML: { __html: cardData.summary } })
    )
  );
}

exports.default = (0, _reactCssModules2.default)(Project, _project2.default, { allowMultiple: true });

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(5);

var _actions = __webpack_require__(20);

var _ProjectsList = __webpack_require__(49);

var _ProjectsList2 = _interopRequireDefault(_ProjectsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapStateToProps(state) {
  if (state.projects.isLoading) {
    return {
      isLoading: true
    };
  } else if (state.projects.error) {
    // @todo log error
    return {
      error: true
    };
  } else if (state.projects.isFetched) {
    return {
      projects: state.projects.data
    };
  } else {
    return {};
  }
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, { fetchProjects: _actions.fetchProjects })(_ProjectsList2.default);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(10);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Header = __webpack_require__(7);

var _Header2 = _interopRequireDefault(_Header);

var _Loader = __webpack_require__(8);

var _Loader2 = _interopRequireDefault(_Loader);

var _Error = __webpack_require__(6);

var _Error2 = _interopRequireDefault(_Error);

var _Project = __webpack_require__(47);

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var summary = 'This is a list of software authored by the developer. Clicking on the title of an item will open a new tab/window navigated to a publicly hosted version of the software. Each project`s source code is available via the `source` link.';

var ProjectsList = function (_React$Component) {
  _inherits(ProjectsList, _React$Component);

  function ProjectsList() {
    _classCallCheck(this, ProjectsList);

    return _possibleConstructorReturn(this, (ProjectsList.__proto__ || Object.getPrototypeOf(ProjectsList)).apply(this, arguments));
  }

  _createClass(ProjectsList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.projects) {
        this.props.fetchProjects();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          projects = _props.projects,
          isLoading = _props.isLoading,
          error = _props.error;

      var content = void 0;

      if (projects) {
        var sortedData = projects.sort(function (a, b) {
          return b.order - a.order;
        });

        content = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Header2.default, { summary: summary }),
          sortedData.map(function (projectsData) {
            return _react2.default.createElement(_Project2.default, { key: projectsData.id, cardData: projectsData });
          })
        );
      } else if (isLoading) {
        content = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Header2.default, { summary: summary }),
          _react2.default.createElement(_Loader2.default, null)
        );
      } else if (error) {
        // @todo reroute to 5xx view
        content = _react2.default.createElement(_Error2.default, null);
      } else {
        content = null;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactHelmet2.default,
          null,
          _react2.default.createElement(
            'title',
            null,
            'dslama.net - projects'
          )
        ),
        content
      );
    }
  }]);

  return ProjectsList;
}(_react2.default.Component);

exports.default = ProjectsList;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProjectsContainer = __webpack_require__(48);

var _ProjectsContainer2 = _interopRequireDefault(_ProjectsContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectsParentContainer = function (_React$Component) {
  _inherits(ProjectsParentContainer, _React$Component);

  function ProjectsParentContainer() {
    _classCallCheck(this, ProjectsParentContainer);

    return _possibleConstructorReturn(this, (ProjectsParentContainer.__proto__ || Object.getPrototypeOf(ProjectsParentContainer)).apply(this, arguments));
  }

  _createClass(ProjectsParentContainer, [{
    key: 'render',
    value: function render() {
      var editProjectsComponent = this.props.children;


      return editProjectsComponent || _react2.default.createElement(_ProjectsContainer2.default, null);
    }
  }]);

  return ProjectsParentContainer;
}(_react2.default.Component);

exports.default = ProjectsParentContainer;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(3);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _add = __webpack_require__(81);

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Add = function (_React$Component) {
  _inherits(Add, _React$Component);

  function Add() {
    _classCallCheck(this, Add);

    return _possibleConstructorReturn(this, (Add.__proto__ || Object.getPrototypeOf(Add)).apply(this, arguments));
  }

  _createClass(Add, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          serverResult = _props.serverResult,
          submitHandler = _props.submitHandler,
          changeHandler = _props.changeHandler,
          author = _props.author,
          title = _props.title,
          quote = _props.quote,
          publishDate = _props.publishDate,
          publication = _props.publication,
          url = _props.url;


      var serverResultClasses = ['server-message'];
      if (serverResult.error) {
        serverResultClasses.push('error');
      } else {
        serverResultClasses.push('success');
      }

      return _react2.default.createElement(
        'form',
        { styleName: 'container', onSubmit: submitHandler },
        _react2.default.createElement('input', { type: 'text', value: author, onChange: changeHandler.bind(this, 'author'), placeholder: 'author', styleName: 'form-element' }),
        _react2.default.createElement('textarea', { value: title, onChange: changeHandler.bind(this, 'title'), placeholder: 'title', styleName: 'form-element' }),
        _react2.default.createElement('textarea', { value: quote, onChange: changeHandler.bind(this, 'quote'), placeholder: 'quote', styleName: 'form-element' }),
        _react2.default.createElement('input', { value: publishDate, type: 'text', onChange: changeHandler.bind(this, 'publishDate'), placeholder: 'publishDate', styleName: 'form-element' }),
        _react2.default.createElement('input', { value: publication, type: 'text', onChange: changeHandler.bind(this, 'publication'), placeholder: 'publication', styleName: 'form-element' }),
        _react2.default.createElement('textarea', { value: url, onChange: changeHandler.bind(this, 'url'), placeholder: 'url', styleName: 'form-element' }),
        _react2.default.createElement(
          'div',
          { styleName: serverResultClasses.join(' ') },
          serverResult.message
        ),
        _react2.default.createElement('input', { type: 'submit', value: 'Add Reading', styleName: 'form-element' })
      );
    }
  }]);

  return Add;
}(_react2.default.Component);

exports.default = (0, _reactCssModules2.default)(Add, _add2.default, { allowMultiple: true });

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _Add = __webpack_require__(51);

var _Add2 = _interopRequireDefault(_Add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddContainer = function (_React$Component) {
  _inherits(AddContainer, _React$Component);

  function AddContainer(props) {
    _classCallCheck(this, AddContainer);

    var _this = _possibleConstructorReturn(this, (AddContainer.__proto__ || Object.getPrototypeOf(AddContainer)).call(this, props));

    _this.defaultServerState = {
      serverResult: {
        message: '',
        error: null
      }
    };

    _this.defaultFormState = {
      author: '',
      title: '',
      quote: '',
      publishDate: '',
      publication: '',
      url: ''
    };

    _this.defaultState = Object.assign({}, _this.defaultFormState, _this.defaultServerState);
    _this.state = _this.defaultState;

    _this._onSubmit = _this._onSubmit.bind(_this);
    _this._onChange = _this._onChange.bind(_this);
    return _this;
  }

  _createClass(AddContainer, [{
    key: '_onSubmit',
    value: function _onSubmit(event) {
      var _this2 = this;

      // prevent page refresh
      event.preventDefault();

      try {
        // data validations
        //
        // 1) No empty inputs
        Object.keys(this.state).forEach(function (key) {
          if (!_this2.state[key]) {
            throw new Error('Invalid Submission: \'' + key + '\' cannot be falsy');
          }
        });
        // 2) publish date must be in a correct format
        var publishDate = new Date(this.state.publishDate).valueOf();
        if (!publishDate) {
          throw new Error('Invalid date!');
        }

        // data to push to dynamoDB
        var readingData = {
          author: this.state.author,
          title: this.state.title,
          quote: this.state.quote,
          publishDate: publishDate,
          publication: this.state.publication,
          url: this.state.url

          // push data to dynamoDB
        };_axios2.default.post('/api/readings', readingData).then(function (res) {
          _this2.setState({ serverResult: {
              message: 'Success!',
              error: null
            } });
          // clear form values
          _this2.setState(_this2.defaultFormState);
        }).catch(function (err) {
          throw err;
        });
      } catch (error) {
        this.setState({ serverResult: {
            message: error.message,
            error: error
          }
        });
      }
    }
  }, {
    key: '_onChange',
    value: function _onChange(element, event) {
      this.setState(_defineProperty({}, element, event.target.value));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Add2.default, {
        serverResult: this.state.serverResult,
        submitHandler: this._onSubmit,
        changeHandler: this._onChange,
        author: this.state.author,
        title: this.state.title,
        quote: this.state.quote,
        publishDate: this.state.publishDate,
        publication: this.state.publication,
        url: this.state.url
      });
    }
  }]);

  return AddContainer;
}(_react2.default.Component);

exports.default = AddContainer;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(3);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _common = __webpack_require__(29);

var _common2 = _interopRequireDefault(_common);

var _helpers = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Reading(_ref) {
  var cardData = _ref.cardData;

  var date = new Date(cardData.publishDate);
  var publishDate = (0, _helpers.formatDate)(date);

  return _react2.default.createElement(
    'div',
    { key: cardData.id, styleName: 'flex-container' },
    _react2.default.createElement(
      'a',
      {
        styleName: 'card-link',
        href: cardData.url,
        target: '_blank' },
      _react2.default.createElement(
        'div',
        { styleName: 'card shadow' },
        _react2.default.createElement(
          'div',
          { styleName: 'title' },
          cardData.title
        ),
        _react2.default.createElement(
          'div',
          { styleName: 'details' },
          _react2.default.createElement(
            'div',
            null,
            cardData.author + ' @ ' + cardData.publication
          ),
          _react2.default.createElement(
            'div',
            null,
            publishDate
          )
        ),
        _react2.default.createElement('div', { styleName: 'quote', dangerouslySetInnerHTML: { __html: cardData.quote } })
      )
    )
  );
}

exports.default = (0, _reactCssModules2.default)(Reading, _common2.default, { allowMultiple: true });

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(5);

var _actions = __webpack_require__(22);

var _ReadingsList = __webpack_require__(55);

var _ReadingsList2 = _interopRequireDefault(_ReadingsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  if (state.readings.isLoading) {
    return {
      isLoading: state.readings.isLoading
    };
  } else if (state.readings.error) {
    // @todo log error
    return {
      error: true
    };
  } else if (state.readings.isFetched) {
    return {
      readings: state.readings.data
    };
  } else {
    return {};
  }
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { fetchReadings: _actions.fetchReadings })(_ReadingsList2.default);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = __webpack_require__(10);

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _Header = __webpack_require__(7);

var _Header2 = _interopRequireDefault(_Header);

var _Loader = __webpack_require__(8);

var _Loader2 = _interopRequireDefault(_Loader);

var _Error = __webpack_require__(6);

var _Error2 = _interopRequireDefault(_Error);

var _Reading = __webpack_require__(53);

var _Reading2 = _interopRequireDefault(_Reading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var summary = 'This is a list of interesting and informative blog posts from others in the international web development community. Most recently discovered posts are nearer the top.';

var Readings = function (_React$Component) {
  _inherits(Readings, _React$Component);

  function Readings() {
    _classCallCheck(this, Readings);

    return _possibleConstructorReturn(this, (Readings.__proto__ || Object.getPrototypeOf(Readings)).apply(this, arguments));
  }

  _createClass(Readings, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.readings) {
        this.props.fetchReadings();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          readings = _props.readings,
          isLoading = _props.isLoading,
          error = _props.error;

      var content = void 0;

      if (readings) {
        var sortedData = readings.sort(function (a, b) {
          return b.foundDate - a.foundDate;
        });

        content = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Header2.default, { summary: summary }),
          sortedData.map(function (readingData) {
            return _react2.default.createElement(_Reading2.default, { key: readingData.id, cardData: readingData });
          })
        );
      } else if (isLoading) {
        content = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Header2.default, { summary: summary }),
          _react2.default.createElement(_Loader2.default, null)
        );
      } else if (error) {
        // @todo reroute to 5xx view
        content = _react2.default.createElement(_Error2.default, null);
      } else {
        content = null;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactHelmet2.default,
          null,
          _react2.default.createElement(
            'title',
            null,
            'dslama.net - readings'
          )
        ),
        content
      );
    }
  }]);

  return Readings;
}(_react2.default.Component);

exports.default = Readings;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ReadingsContainer = __webpack_require__(54);

var _ReadingsContainer2 = _interopRequireDefault(_ReadingsContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReadingsParentContainer = function (_React$Component) {
  _inherits(ReadingsParentContainer, _React$Component);

  function ReadingsParentContainer() {
    _classCallCheck(this, ReadingsParentContainer);

    return _possibleConstructorReturn(this, (ReadingsParentContainer.__proto__ || Object.getPrototypeOf(ReadingsParentContainer)).apply(this, arguments));
  }

  _createClass(ReadingsParentContainer, [{
    key: 'render',
    value: function render() {
      var addReadingsComponent = this.props.children;


      return addReadingsComponent || _react2.default.createElement(_ReadingsContainer2.default, null);
    }
  }]);

  return ReadingsParentContainer;
}(_react2.default.Component);

exports.default = ReadingsParentContainer;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(14);

var _Layout = __webpack_require__(42);

var _Layout2 = _interopRequireDefault(_Layout);

var _About = __webpack_require__(38);

var _About2 = _interopRequireDefault(_About);

var _Edit = __webpack_require__(37);

var _Edit2 = _interopRequireDefault(_Edit);

var _Posts = __webpack_require__(46);

var _Posts2 = _interopRequireDefault(_Posts);

var _Projects = __webpack_require__(50);

var _Projects2 = _interopRequireDefault(_Projects);

var _Readings = __webpack_require__(56);

var _Readings2 = _interopRequireDefault(_Readings);

var _Add = __webpack_require__(52);

var _Add2 = _interopRequireDefault(_Add);

var _Login = __webpack_require__(43);

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Components
exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _Layout2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _About2.default }),
  _react2.default.createElement(
    _reactRouter.Route,
    { path: 'about', component: _About2.default },
    _react2.default.createElement(_reactRouter.Route, { path: 'edit', component: _Edit2.default })
  ),
  _react2.default.createElement(_reactRouter.Route, { path: 'posts', component: _Posts2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: 'projects', component: _Projects2.default }),
  _react2.default.createElement(
    _reactRouter.Route,
    { path: 'readings', component: _Readings2.default },
    _react2.default.createElement(_reactRouter.Route, { path: 'add', component: _Add2.default })
  ),
  _react2.default.createElement(_reactRouter.Route, { path: 'babylou', component: _Login2.default })
);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducers;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(17);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducers = (_reducers = {}, _defineProperty(_reducers, _constants.ABOUT_ADD, function (state, payload) {
  return _extends({}, state, {
    data: payload,
    isFetched: true
  });
}), _defineProperty(_reducers, _constants.ABOUT_FETCH_PENDING, function (state, payload) {
  return _extends({}, state, {
    isLoading: true
  });
}), _defineProperty(_reducers, _constants.ABOUT_FETCH_FULFILLED, function (state, payload) {
  return _extends({}, state, {
    data: payload.data,
    isLoading: false,
    isFetched: true
  });
}), _defineProperty(_reducers, _constants.ABOUT_FETCH_REJECTED, function (state, payload) {
  return _extends({}, state, {
    error: payload.response.data,
    isLoading: false
  });
}), _reducers);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  var actionReducer = reducers[type];
  return typeof actionReducer === 'function' ? actionReducer(state, payload) : state;
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducers;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(19);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducers = (_reducers = {}, _defineProperty(_reducers, _constants.POSTS_ADD, function (state, payload) {
  return _extends({}, state, {
    data: payload,
    isFetched: true
  });
}), _defineProperty(_reducers, _constants.POSTS_FETCH_PENDING, function (state, payload) {
  return _extends({}, state, {
    isLoading: true
  });
}), _defineProperty(_reducers, _constants.POSTS_FETCH_FULFILLED, function (state, payload) {
  return _extends({}, state, {
    data: payload.data,
    isLoading: false,
    isFetched: true
  });
}), _defineProperty(_reducers, _constants.POSTS_FETCH_REJECTED, function (state, payload) {
  return _extends({}, state, {
    error: payload.response.data,
    isLoading: false
  });
}), _reducers);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  var actionReducer = reducers[type];
  return typeof actionReducer === 'function' ? actionReducer(state, payload) : state;
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducers;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(21);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducers = (_reducers = {}, _defineProperty(_reducers, _constants.PROJECTS_ADD, function (state, payload) {
  return _extends({}, state, {
    data: payload,
    isFetched: true
  });
}), _defineProperty(_reducers, _constants.PROJECTS_FETCH_PENDING, function (state, payload) {
  return _extends({}, state, {
    isLoading: true
  });
}), _defineProperty(_reducers, _constants.PROJECTS_FETCH_FULFILLED, function (state, payload) {
  return _extends({}, state, {
    data: payload.data,
    isLoading: false,
    isFetched: true
  });
}), _defineProperty(_reducers, _constants.PROJECTS_FETCH_REJECTED, function (state, payload) {
  return _extends({}, state, {
    error: payload.response.data,
    isLoading: false
  });
}), _reducers);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  var actionReducer = reducers[type];
  return typeof actionReducer === 'function' ? actionReducer(state, payload) : state;
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducers;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(23);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducers = (_reducers = {}, _defineProperty(_reducers, _constants.READINGS_ADD, function (state, payload) {
  return _extends({}, state, {
    data: payload,
    isFetched: true
  });
}), _defineProperty(_reducers, _constants.READINGS_FETCH_PENDING, function (state, payload) {
  return _extends({}, state, {
    isLoading: true
  });
}), _defineProperty(_reducers, _constants.READINGS_FETCH_FULFILLED, function (state, payload) {
  return _extends({}, state, {
    data: payload.data,
    isLoading: false,
    isFetched: true
  });
}), _defineProperty(_reducers, _constants.READINGS_FETCH_REJECTED, function (state, payload) {
  return _extends({}, state, {
    error: payload.response.data,
    isLoading: false
  });
}), _reducers);

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  var actionReducer = reducers[type];
  return typeof actionReducer === 'function' ? actionReducer(state, payload) : state;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(32);

var _reducers = __webpack_require__(61);

var _reducers2 = _interopRequireDefault(_reducers);

var _reducers3 = __webpack_require__(58);

var _reducers4 = _interopRequireDefault(_reducers3);

var _reducers5 = __webpack_require__(59);

var _reducers6 = _interopRequireDefault(_reducers5);

var _reducers7 = __webpack_require__(60);

var _reducers8 = _interopRequireDefault(_reducers7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  readings: _reducers2.default,
  about: _reducers4.default,
  posts: _reducers6.default,
  projects: _reducers8.default
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(32);

var _reduxPromiseMiddleware = __webpack_require__(91);

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

var _reducers = __webpack_require__(62);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)()));
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(13);

var _express2 = _interopRequireDefault(_express);

var _projects = __webpack_require__(69);

var _posts = __webpack_require__(68);

var _about = __webpack_require__(65);

var _readings = __webpack_require__(70);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/projects', _projects.get);
router.get('/posts', _posts.get);
router.get('/about', _about.get);

router.get('/readings', _readings.get);
router.post('/readings', _readings.add);

exports.default = router;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;

var _about = __webpack_require__(24);

function get(req, res) {
  return (0, _about.get)().then(function (data) {
    res.status(200);
    res.json(data);
  }).catch(function () {
    // @todo log error
    res.sendStatus(500);
  });
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateUser = authenticateUser;

var _bcrypt = __webpack_require__(83);

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = __webpack_require__(31);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = __webpack_require__(75);

var _metrics = __webpack_require__(73);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACCESSTOKENCOOKIE = _constants2.default.get('accessTokenCookie');
var SECRET = _constants2.default.get('secret');
var INVALID_CREDS = 'INVALID_CREDS';

function verifyPassword(req, response) {
  // username does not exist in DB
  if (!response) {
    return Promise.reject(new Error(INVALID_CREDS));
  }

  return new Promise(function (resolve, reject) {
    _bcrypt2.default.compare(req.body.password, response, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

function createJWT(res, result) {
  // incorrect password
  if (result !== true) {
    res.sendStatus(418);
    return;
  }

  // create JWT
  var accessToken = _jsonwebtoken2.default.sign({
    // 3 hours
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 3
  }, SECRET);

  // set cookie to JWT
  res.cookie(ACCESSTOKENCOOKIE, accessToken, {
    // 3 hours
    expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
    httpOnly: true
  });

  // send OK response
  res.sendStatus(200);
}

function authenticateUser(req, res) {
  var startTime = Date.now();

  return (0, _user.getHashedPassword)(req.body.username).then(verifyPassword.bind(null, req)).then(createJWT.bind(null, res)).then(function () {
    (0, _metrics.increment)('login.success');
    (0, _metrics.time)('login.suc', Date.now() - startTime);
  }).catch(function (error) {
    var responseCode = error && error.message === INVALID_CREDS ? 418 : 500;

    res.sendStatus(responseCode);
    (0, _metrics.increment)('login.failure');
    (0, _metrics.time)('login.fail', Date.now() - startTime);
  });
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = logout;

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACCESSTOKENCOOKIE = _constants2.default.get('accessTokenCookie');

function logout(req, res) {
  res.clearCookie(ACCESSTOKENCOOKIE, {});
  res.sendStatus(200);
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;

var _posts = __webpack_require__(26);

function get(req, res) {
  return (0, _posts.get)().then(function (data) {
    res.status(200);
    res.json(data);
  }).catch(function () {
    // @todo log error
    res.sendStatus(500);
  });
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;

var _projects = __webpack_require__(27);

function get(req, res) {
  return (0, _projects.get)().then(function (projects) {
    res.status(200);
    res.json(projects);
  }).catch(function () {
    // @todo log error
    res.sendStatus(500);
  });
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = exports.get = undefined;

var _v = __webpack_require__(92);

var _v2 = _interopRequireDefault(_v);

var _readings = __webpack_require__(28);

var _sentry = __webpack_require__(74);

var _sentry2 = _interopRequireDefault(_sentry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function get(req, res) {
  return (0, _readings.get)().then(function (readings) {
    res.status(200);
    res.json(readings);
  }).catch(function (e) {
    // res.sendStatus(500)
    res.status(500).json(e);
    // @todo log error
    _sentry2.default.captureException(e);
  });
}

function add(req, res) {
  // @todo validate against empty strings (on frontend too!)
  var readingData = {
    author: req.body.author,
    foundDate: new Date().getTime(),
    publishDate: req.body.publishDate,
    publication: req.body.publication,
    quote: req.body.quote,
    title: req.body.title,
    url: req.body.url,
    id: (0, _v2.default)()
  };

  return (0, _readings.add)(readingData).then(function () {
    res.sendStatus(200);
  }).catch(function () {
    res.sendStatus(500);
  });
}

exports.get = get;
exports.add = add;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(90);

var _reactRouter = __webpack_require__(14);

var _reactRedux = __webpack_require__(5);

var _styledComponents = __webpack_require__(4);

var _store = __webpack_require__(63);

var _store2 = _interopRequireDefault(_store);

var _actions = __webpack_require__(22);

var _actions2 = __webpack_require__(16);

var _actions3 = __webpack_require__(18);

var _actions4 = __webpack_require__(20);

var _routes = __webpack_require__(57);

var _routes2 = _interopRequireDefault(_routes);

var _jwt = __webpack_require__(25);

var _posts = __webpack_require__(26);

var _readings = __webpack_require__(28);

var _about = __webpack_require__(24);

var _projects = __webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchDataByPath(req) {
  return new Promise(function (resolve, reject) {
    var store = (0, _store2.default)();

    switch (req.originalUrl) {
      case '/':
      case '/about':
        (0, _about.get)().then(function (data) {
          store.dispatch((0, _actions2.addAbout)(data));
          resolve({ store: store });
        }).catch(function () {
          // @todo log error
          resolve();
        });
        break;
      case '/projects':
        (0, _projects.get)().then(function (data) {
          store.dispatch((0, _actions4.addProjects)(data));
          resolve({ store: store });
        }).catch(function () {
          // @todo log error
          resolve();
        });
        break;
      case '/posts':
        (0, _posts.get)().then(function (data) {
          store.dispatch((0, _actions3.addPosts)(data));
          resolve({ store: store });
        }).catch(function () {
          // @todo log error
          resolve();
        });
        break;
      case '/readings':
        (0, _readings.get)().then(function (data) {
          store.dispatch((0, _actions.addReadings)(data));
          resolve({ store: store });
        }).catch(function () {
          // @todo log error
          resolve();
        });
        break;
      case '/readings/add':
        (0, _jwt.verify)(req).then(function () {
          resolve();
        }).catch(function () {
          // @todo log warning
          resolve({ redirect: { pathname: '/', search: '' } });
        });
        break;
      default:
        resolve();
    }
  });
}

/**
  * Perform server-side async data fetching in this function (according to path)
  **/
function matchRoutes(routes, req) {
  return new Promise(function (resolve, reject) {
    (0, _reactRouter.match)({ routes: routes, location: req.originalUrl }, function (err, redirect, props) {
      if (err) {
        reject(err);
      } else {
        fetchDataByPath(req).then(function (result) {
          var store = void 0;

          if (result) {
            redirect = result.redirect || redirect;
            store = result.store;
          }

          resolve({ props: props, redirect: redirect, store: store });
        });
      }
    });
  });
}

function renderComponent(req, res) {
  matchRoutes(_routes2.default, req).then(function (_ref) {
    var redirect = _ref.redirect,
        props = _ref.props,
        store = _ref.store;

    if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      store = store || (0, _store2.default)();

      // generate store with data
      var initialState = JSON.stringify(store.getState());

      var sheet = new _styledComponents.ServerStyleSheet();

      var markup = (0, _server.renderToString)(sheet.collectStyles(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store, key: 'provider' },
        _react2.default.createElement(_reactRouter.RouterContext, _extends({}, props, {
          createElement: function createElement(Component, props) {
            return _react2.default.createElement(Component, props);
          }
        }))
      )));

      var styleTags = sheet.getStyleTags();

      res.status(200).render('index', { markup: markup, styleTags: styleTags, initialState: initialState });
    } else {
      // @todo: replace with 302 redirect to /404
      res.status(404).send('Not found');
    }
  }).catch(function (err) {
    // @todo log error
    console.error(err);
    res.status(500).send('500: System Error');
  });
}

exports.default = renderComponent;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = isAuthenticated;

var _jwt = __webpack_require__(25);

function isAuthenticated(req, res) {
  return (0, _jwt.verify)(req).then(function () {
    res.sendStatus(200);
  }).catch(function () {
    // @todo log error
    res.sendStatus(418);
  });
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lynx = __webpack_require__(87);

var _lynx2 = _interopRequireDefault(_lynx);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @overview Metrics configuration
 * @requires lynx
 *
 * @todo only send metrics if `METRICS_HOST` and other required env vars are set, otherwise leave as placeholder functions
 */

var settings = {
  host: _constants2.default.get('METRICS_HOST'),
  port: _constants2.default.get('METRICS_PORT')
};

var client = new _lynx2.default(settings.host, settings.port);

var prefix = _constants2.default.get('METRICS_PREFIX') || 'dslamanet';

function sanitizeName(name) {
  var tokens = name.split('/');

  // prevent a leading '_'
  tokens.shift();
  return tokens.join('_');
}

function createRequestNamespace(req) {
  var method = req.method || 'unknown_method';
  var urlTokens = req.originalUrl.split('?');
  var resourceName = urlTokens[0].replace('.', '_');
  var sanitizedResourceName = sanitizeName(resourceName);
  return ['requests', method.toLowerCase(), sanitizedResourceName].join('.');
}

function increment(data) {
  client.increment(prefix + '.' + data);
}

function time(data, duration) {
  client.timing(prefix + '.' + data, duration);
}

function sendTimeMetric(startTime, namespace, result) {
  var duration = new Date().getTime() - startTime;
  time(namespace + '.' + result, duration);
}

/**
 * Function called on response finish that sends stats to statsd
 **/
function sendFinishedRequest(req, res, startTime) {
  // we don't want to metric EB health queries
  if (req.path.includes('health')) {
    return;
  }

  var namespace = createRequestNamespace(req);

  // Send metric: Status Code
  var statusCode = res.statusCode || 'unknown_status';
  increment(namespace + '.status_code.' + statusCode);

  // Send metric: Response Time
  var duration = new Date().getTime() - startTime;
  time(namespace + '.response_time', duration);
}

/**
 * Function called on request close (client initiated) that sends stats to statsd
 **/
function sendRequestClosed(req, startTime) {
  // we don't want to metric EB health queries
  if (req.path.includes('health')) {
    return;
  }

  var namespace = createRequestNamespace(req);

  // Send metric: Status Code
  increment(namespace + '.status_code.client_closed_connection');

  // Send metric: Response Time
  var duration = new Date().getTime() - startTime;
  time(namespace + '.response_time', duration);
}

function middleware(req, res, next) {
  var startTime = new Date().getTime();

  // Add response listeners
  //
  // Server finishes sending a response
  res.once('finish', sendFinishedRequest.bind(null, req, res, startTime));
  // Client initiated the end of the request
  req.once('close', sendRequestClosed.bind(null, req, startTime));

  if (next) {
    next();
  }
}

module.exports = {
  middleware: middleware,
  increment: increment,
  sendTimeMetric: sendTimeMetric,
  client: client
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _raven = __webpack_require__(89);

var _raven2 = _interopRequireDefault(_raven);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @todo only for production builds
_raven2.default.config(_constants2.default.get('SENTRY_DNS')).install();

exports.default = _raven2.default;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHashedPassword = undefined;

var _db = __webpack_require__(9);

var _db2 = _interopRequireDefault(_db);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHashedPassword = exports.getHashedPassword = function getHashedPassword(username) {
  return _db2.default.table(_constants2.default.get('DB_TABLE_USERS')).where('name').eq(username).get().then(function (res) {
    return res && res.password ? res.password : null;
  });
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(13);

var _express2 = _interopRequireDefault(_express);

var _api = __webpack_require__(64);

var _api2 = _interopRequireDefault(_api);

var _logout = __webpack_require__(67);

var _status = __webpack_require__(72);

var _login = __webpack_require__(66);

var _renderComponent = __webpack_require__(71);

var _renderComponent2 = _interopRequireDefault(_renderComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/api', _api2.default);

router.post('/login', _login.authenticateUser);
router.post('/logout', _logout.logout);
router.get('/status/authentication', _status.isAuthenticated);

router.get('*', _renderComponent2.default);

exports.default = router;

/***/ }),
/* 77 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"mobile":"src-client-components-Layout-Navbar-Hamburger-hamburger__mobile--mx0uj","hamburger":"src-client-components-Layout-Navbar-Hamburger-hamburger__hamburger--397ER","line":"src-client-components-Layout-Navbar-Hamburger-hamburger__line--3KO9O","active":"src-client-components-Layout-Navbar-Hamburger-hamburger__active--ueoJF"};

/***/ }),
/* 78 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"shadow":"src-client-components-Layout-Navbar-navbar__shadow--1Oaa8","card":"src-client-components-Layout-Navbar-navbar__card--3sY_P","flex-container":"src-client-components-Layout-Navbar-navbar__flex-container--1Y1Dl","card-link":"src-client-components-Layout-Navbar-navbar__card-link--1PBhq","title":"src-client-components-Layout-Navbar-navbar__title--34ggy","details":"src-client-components-Layout-Navbar-navbar__details--5QOyT","quote":"src-client-components-Layout-Navbar-navbar__quote--2ITkM","outer-container":"src-client-components-Layout-Navbar-navbar__outer-container--1wOrw","middle-container":"src-client-components-Layout-Navbar-navbar__middle-container--2iHmY","inner-container":"src-client-components-Layout-Navbar-navbar__inner-container--1KWZM","link":"src-client-components-Layout-Navbar-navbar__link--3ESxj","active":"src-client-components-Layout-Navbar-navbar__active--3cEHk","mobile":"src-client-components-Layout-Navbar-navbar__mobile--1fmLo","show":"src-client-components-Layout-Navbar-navbar__show--3zwlQ"};

/***/ }),
/* 79 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"shadow":"src-client-components-Login-login__shadow--3wBgv","card":"src-client-components-Login-login__card--1O99M","flex-container":"src-client-components-Login-login__flex-container--1fEFa","card-link":"src-client-components-Login-login__card-link--jzGEr","title":"src-client-components-Login-login__title--2XX2P","details":"src-client-components-Login-login__details--3KpoH","quote":"src-client-components-Login-login__quote--3Edhd","container":"src-client-components-Login-login__container--2gARE","auth-div":"src-client-components-Login-login__auth-div--3lf1G","form-input":"src-client-components-Login-login__form-input--j5I6U","form-text":"src-client-components-Login-login__form-text--LmRzk"};

/***/ }),
/* 80 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"shadow":"src-client-components-Projects-project__shadow--1n7z_","card":"src-client-components-Projects-project__card--Gj7nE","flex-container":"src-client-components-Projects-project__flex-container--3K7Qw","card-link":"src-client-components-Projects-project__card-link--3z9SJ","title":"src-client-components-Projects-project__title--3Vhbg","details":"src-client-components-Projects-project__details--34o5V","quote":"src-client-components-Projects-project__quote--3zdDu","source-link":"src-client-components-Projects-project__source-link--1JInr","description":"src-client-components-Projects-project__description--wVn_n","project-link":"src-client-components-Projects-project__project-link--3Xtv1"};

/***/ }),
/* 81 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"shadow":"src-client-components-Readings-Add-add__shadow--BRB5e","card":"src-client-components-Readings-Add-add__card--2SJlV","flex-container":"src-client-components-Readings-Add-add__flex-container--BZ5l6","card-link":"src-client-components-Readings-Add-add__card-link--3lpyP","title":"src-client-components-Readings-Add-add__title--1G4MR","details":"src-client-components-Readings-Add-add__details--1Cs6U","quote":"src-client-components-Readings-Add-add__quote--1M-S3","container":"src-client-components-Readings-Add-add__container--aYs-_","form-element":"src-client-components-Readings-Add-add__form-element--Od8Kw","server-message":"src-client-components-Readings-Add-add__server-message--3MtXu","error":"src-client-components-Readings-Add-add__error--1k0_E","success":"src-client-components-Readings-Add-add__success--2xGts"};

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("aws-dynamodb");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = require("lynx");

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = require("nconf");

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = require("raven");

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = require("redux-promise-middleware");

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34);
module.exports = __webpack_require__(33);


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map