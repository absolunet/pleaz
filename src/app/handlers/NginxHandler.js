import Handler from './Handler';

/**
 * NGINX Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class NginxHandler extends Handler {

	/**
	 * Start NGINX service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async start() {
		await this.test();
		await this.spawn('brew', 'services start nginx');
	}

	/**
	 * Restart NGINX service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async restart() {
		await this.spawn('brew', 'services restart nginx');
	}

	/**
	 * Stop NGINX service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async stop() {
		await this.spawn('brew', 'services stop nginx');
	}

	/**
	 * Test NGINX service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async test() {
		await this.spawn('nginx', '-t');
	}

	/**
	 * @inheritdoc
	 */
	get privileged() {
		return true;
	}

}


export default NginxHandler;
