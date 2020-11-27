"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _privateRegistry = _interopRequireDefault(require("@absolunet/private-registry"));

var _ioc = require("@absolunet/ioc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//--------------------------------------------------------
//-- Node IoC - Providers - Route Service Provider
//--------------------------------------------------------

/**
 * Route service provider.
 *
 * @memberof app.providers
 * @augments ioc.foundation.ServiceProvider
 * @hideconstructor
 */
class RouteServiceProvider extends _ioc.ServiceProvider {
  /**
   * @inheritdoc
   */
  get name() {
    return 'Node IoC - Route';
  }
  /**
   * Boot the service provider.
   */


  boot() {
    (0, _privateRegistry.default)(this).set('router', this.app.make('router'));
    this.map();
  }
  /**
   * Map the application routes.
   */


  map() {
    this.mapApiRoutes();
    this.mapWebRoutes();
  }
  /**
   * Map web routes in the router.
   */


  mapWebRoutes() {
    this.router.group({}, this.app.getModule(this.app.routesPath('web.js')));
  }
  /**
   * Map web routes in the router.
   */


  mapApiRoutes() {
    this.router.group({
      prefix: 'api',
      as: 'api.'
    }, this.app.getModule(this.app.routesPath('api.js')));
  }
  /**
   * Application router.
   *
   * @type {Router}
   */


  get router() {
    return (0, _privateRegistry.default)(this).get('router');
  }

}

var _default = RouteServiceProvider;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;