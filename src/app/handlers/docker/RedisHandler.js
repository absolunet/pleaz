import BaseHandler from './BaseHandler';

/**
 * Redis Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BaseHandler
 */
class RedisHandler extends BaseHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'redis';
	}

}


export default RedisHandler;
