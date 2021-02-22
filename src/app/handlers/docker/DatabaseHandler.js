import Handler from './Handler';

/**
 * Database Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class DatabaseHandler extends Handler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'db';
	}

}


export default DatabaseHandler;
