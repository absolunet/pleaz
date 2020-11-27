"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ioc = require("@absolunet/ioc");

//--------------------------------------------------------
//-- Node IoC - Console - Kernel
//--------------------------------------------------------

/**
 * Application kernel that handle incoming CLI request.
 *
 * @memberof app.console
 * @augments ioc.foundation.console.Kernel
 * @hideconstructor
 */
class Kernel extends _ioc.ConsoleKernel {
  /**
   * @inheritdoc
   */
  async beforeHandling() {
    // Here, you can perform actions before handling request.
    await this.loadTranslations();
    this.registerCommands();
  }
  /**
   * @inheritdoc
   */


  afterHandling() {// Here, you can perform actions after request was handled, if no error was thrown.
  }
  /**
   * @inheritdoc
   */


  terminating() {// Here, you can perform actions before the application terminates.
  }
  /**
   * Load translations to prevent async translations.
   *
   * @returns {Promise} The async process promise.
   */


  async loadTranslations() {
    await this.app.make('translator').driver().loadTranslations();
  }
  /**
   * Register commands in the command registrar based on application command path.
   */


  registerCommands() {
    this.commandRegistrar.addFromFolder(this.app.commandPath());
  }

}

var _default = Kernel;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;