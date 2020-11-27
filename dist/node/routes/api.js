"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

//--------------------------------------------------------
//-- Node IoC - API routes
//--------------------------------------------------------
var _default = router => {
  // All of the routes here will be prefixed by the uri '/api'.
  // All route names will also be prefixed by 'api.'.
  //
  // Let's build a nice API!
  router.get('/app', 'AppController@index').name('app.index');
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;