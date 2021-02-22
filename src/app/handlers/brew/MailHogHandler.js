import BrewHandler from './Handler';

/**
 * MailHog Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BrewHandler
 */
class MailHogHandler extends BrewHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'mailhog';
	}

}


export default MailHogHandler;
