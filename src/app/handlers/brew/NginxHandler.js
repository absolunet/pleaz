import BrewHandler from './Handler';

/**
 * NGINX Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class NginxHandler extends BrewHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'nginx';
	}

	/**
	 * @inheritdoc
	 */
	async start() {
		await this.test();
		await super.start();

		return {
			message: `${this.serviceName} is started.`
		};
	}

	/**
	 * Test NGINX service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async test() {
		await this.spawn(`${this.serviceName}`, '-t', true);
	}

}


export default NginxHandler;
