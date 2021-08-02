import BaseHandler from './BaseHandler';

/**
 * NGINX Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BaseHandler
 */
class NginxHandler extends BaseHandler {

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
	 * @inheritdoc
	 */
	async restart() {
		await this.test();
		await super.restart();

		return {
			message: `${this.serviceName} is restarted.`
		};
	}

	/**
	 * Test NGINX service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async test() {
		await this.spawn(`nginx`, '-t', true);
	}

}


export default NginxHandler;
