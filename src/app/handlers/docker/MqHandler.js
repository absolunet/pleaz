import BaseHandler from './BaseHandler';

/**
 * Mq Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BaseHandler
 */
class MqHandler extends BaseHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'mq';
	}

}


export default MqHandler;
