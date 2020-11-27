"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ioc = require("@absolunet/ioc");

//--------------------------------------------------------
//-- Node IoC - Bootstrap - Lifecycle
//--------------------------------------------------------
var _default = async (app, shouldHandleRequest = true) => {
  let hadError = false; // Define exception handler callback for base process unhandled error events.

  const handleException = async exception => {
    if (exception instanceof _ioc.ApplicationBootingError) {
      // eslint-disable-next-line no-console
      console.error(exception);
    } else {
      await app.make('exception.handler').handle(exception);
    }

    hadError = true;
  }; // Bind exception handler callback on unhandled error events.


  process.on('unhandledRejection', handleException).on('uncaughtException', handleException); // Make the kernel instance

  const kernel = app.make('kernel'); // Boot the application.

  app.bootIfNotBooted(); // If the application should handle request, and if there was no booting error, handle it with the kernel instance.

  if (shouldHandleRequest && !hadError) {
    try {
      // Handle the incoming request.
      await kernel.handle();
    } catch (error) {
      // If an error occurred, handle it through the defined exception handler.
      await handleException(error);
    } finally {
      // When the request, or an error, has been handled, terminate the request.
      await kernel.terminate();
    }
  }
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;