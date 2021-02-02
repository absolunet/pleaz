import Handler from './Handler';

/**
 * MailHog Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class MailHogHandler extends Handler {

	/**
	 * Start MailHog service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async start() {
		await this.spawn('brew', 'services start mailhog');
	}

	/**
	 * Restart MailHog service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async restart() {
		await this.spawn('brew', 'services restart mailhog');
	}

	/**
	 * Stop MailHog service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async stop() {
		await this.spawn('brew', 'services stop mailhog');
	}

	/**
	 * @inheritdoc
	 */
	get privileged() {
		return false;
	}

}


export default MailHogHandler;
