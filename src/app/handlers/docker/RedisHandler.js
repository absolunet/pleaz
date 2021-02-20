import DockerHandler from './DockerHandler';

/**
 * Redis Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.DockerHandler
 */
class RedisHandler extends DockerHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'redis';
	}

}


export default RedisHandler;
