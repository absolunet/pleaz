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
	 *  Get Server configuration path.
	 *
	 * @returns {string} - Server configuration path.
	 */
	get configServerPath() {
		return '/usr/local/etc/nginx/servers';
	}

	/**
	 * Get Server Web Root path.
	 *
	 * @returns {string} - Server Web Root path.
	 */
	get webPath() {
		return '/usr/local/var/www';
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
