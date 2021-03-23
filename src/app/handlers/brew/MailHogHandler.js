import BaseHandler from './BaseHandler';

/**
 * MailHog Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BaseHandler
 */
class MailHogHandler extends BaseHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'mailhog';
	}

}


export default MailHogHandler;
