"use strict";

var _ioc = require("@absolunet/ioc");

//--------------------------------------------------------
//-- Node IoC - Bootstrap - Mixins - Example
//--------------------------------------------------------

/**
 * Example mixin.
 *
 * @class
 * @name Example
 * @memberof bootstrap.mixins
 * @hideconstructor
 */
_ioc.mixins.factory('example', SuperClass => {
  /**
   * Example mixin.
   */
  return class ExampleMixin extends SuperClass {
    /**
     * Example method.
     *
     * @memberof bootstrap.mixins.Example
     * @instance
     */
    method() {//
    }

  };
});