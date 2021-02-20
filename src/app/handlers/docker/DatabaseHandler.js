import DockerHandler from './DockerHandler';

/**
 * Database Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.DockerHandler
 */
class DatabaseHandler extends DockerHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'db';
	}

}


export default DatabaseHandler;
