import Handler from './Handler';

/**
 * Mq Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class MqHandler extends Handler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'mq';
	}

}


export default MqHandler;
