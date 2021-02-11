import DockerHandler from './DockerHandler';

/**
 * Database Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class DatabaseHandler extends DockerHandler {

	/**
	 * @inheritdoc
	 */
	get privileged() {
		return false;
	}

}


export default DatabaseHandler;
