"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _facebook = _interopRequireDefault(require("../controller/facebook"));

var _passport = _interopRequireDefault(require("../helpers/passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import controllers and helpers and use it in your route handlers
var routes = _express["default"].Router();

routes.get('/test', function (req, res) {
  res.status(200).json({
    status: 200,
    msg: 'Route module is working perfectly'
  }).end();
});
routes.get('/auth/failure', function (req, res) {
  res.status(401).json({
    status: 401,
    msg: 'faceboo auth failure'
  }).end();
});
routes.get('/auth/facebook', _passport["default"].authenticate('facebook'));
routes.get('/auth/facebook/callback', _passport["default"].authenticate('facebook', {
  failureRedirect: '/auth/failure'
}), _facebook["default"].signIn);
var _default = routes;
exports["default"] = _default;