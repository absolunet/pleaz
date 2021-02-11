import DockerHandler from './DockerHandler';

/**
 * Redis Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class RedisHandler extends DockerHandler {

	/**
	 * @inheritdoc
	 */
	get service() {
		return 'redis';
	}

	/**
	 * @inheritdoc
	 */
	get privileged() {
		return false;
	}

}


export default RedisHandler;
