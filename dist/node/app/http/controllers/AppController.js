"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Controller = _interopRequireDefault(require("./Controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//--------------------------------------------------------
//-- Node IoC - HTTP - Controllers - Application Controller
//--------------------------------------------------------

/**
 * Application controller that handles API request for information.
 *
 * @memberof app.http.controllers
 * @augments app.http.controllers.Controller
 * @hideconstructor
 */
class AppController extends _Controller.default {
  /**
   * @inheritdoc
   */
  static get dependencies() {
    return ['config'];
  }
  /**
   * Show application basic information.
   *
   * @returns {response} JSON response.
   */


  index() {
    const {
      name,
      locale
    } = this.config.get('app');
    return this.json({
      name,
      locale
    });
  }

}

var _default = AppController;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;