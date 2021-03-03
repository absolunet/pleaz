import BaseHandler from './BaseHandler';

/**
 * Database Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BaseHandler
 */
class DatabaseHandler extends BaseHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'db';
	}

}


export default DatabaseHandler;
