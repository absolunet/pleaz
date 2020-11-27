//--------------------------------------------------------
//-- Node IoC - Bootstrap - Mixins - Example
//--------------------------------------------------------

import { mixins } from '@absolunet/ioc';


/**
 * Example mixin.
 *
 * @class
 * @name Example
 * @memberof bootstrap.mixins
 * @hideconstructor
 */
mixins.factory('example', (SuperClass) => {

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
		method() {
			//
		}

	};

});
