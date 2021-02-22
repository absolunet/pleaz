import Handler from './Handler';

/**
 * Redis Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class RedisHandler extends Handler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'redis';
	}

}


export default RedisHandler;
