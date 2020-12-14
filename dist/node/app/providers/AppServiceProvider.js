"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _privateRegistry = _interopRequireDefault(require("@absolunet/private-registry"));

var _ioc = require("@absolunet/ioc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//--------------------------------------------------------
//-- Node IoC - Providers - Application Service Provider
//--------------------------------------------------------

/**
 * Application service provider.
 *
 * @memberof app.providers
 * @augments ioc.foundation.ServiceProvider
 * @hideconstructor
 */
class AppServiceProvider extends _ioc.ServiceProvider {
  /**
   * @inheritdoc
   */
  get name() {
    return 'Node IoC - Application';
  }
  /**
   * Register any application services.
   */


  register() {
    // You may register any service either as a binding or a singleton using
    // this.app.bind('service.name', concrete) or
    // this.app.singleton('service.name', concrete). However, you should not
    // use any service since some services may not be available yet.
    const VERBOSIFIED = 'verbosified';

    if (!(0, _privateRegistry.default)(_ioc.Command).get(VERBOSIFIED)) {
      (0, _privateRegistry.default)(_ioc.Command).set(VERBOSIFIED, true);
      const {
        spawn,
        call
      } = _ioc.Command.prototype;

      const logCommand = function (prefix, command) {
        this.log(`>> ${prefix}\n>> ${command.trim()}\n`);
      };

      _ioc.Command.prototype.spawn = function (command, parameters = '', ...rest) {
        const stringParameters = Array.isArray(parameters) ? parameters.join(' ') : parameters;
        logCommand.call(this, 'Running', `${command} ${stringParameters}`.trim());
        return spawn.call(this, command, parameters, ...rest);
      };

      _ioc.Command.prototype.call = function (command, ...rest) {
        logCommand.call(this, 'Running internal command', command);
        return call.call(this, `${command} ${this.verbose ? `-${'v'.repeat(this.verbose)}` : ''}`.trimEnd(), ...rest);
      };
    }
  }
  /**
   * Bootstrap any application services.
   */


  boot() {// You may use services here to bootstrap them. You can get a service
    // instance using this.app.make('service.name').
  }

}

var _default = AppServiceProvider;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;