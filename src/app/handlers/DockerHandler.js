import Handler from './Handler';

/**
 * Docker Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class DockerHandler extends Handler {

	/**
	 * Get Service name.
	 *
	 * @returns {string} - Return service name.
	 */
	get service() {
		return '';
	}

	/**
	 * Start docker-compose containers.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async start() {
		await this.spawn('docker-compose', `up --detach ${this.getService(this.service)}`);
	}

	/**
	 * Stop docker-compose containers.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async stop() {
		await this.spawn('docker-compose', `stop ${this.getService(this.service)}`);
	}

	/**
	 * Restart docker-compose containers.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async restart() {
		await this.spawn('docker-compose', `restart ${this.getService(this.service)}`);
	}

	/**
	 * Clean docker-compose containers.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async clean() {
		await this.spawn('docker-compose', this.service ? `rm --stop -v ${this.service}` : 'down');
	}

	/**
	 * Test docker-compose service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async test() {
		await this.spawn('docker-compose', 'config');
	}

	/**
	 * Get Service container name.
	 *
	 * @param {string|null} service - Service container name.
	 * @returns {string} - Return service container name.
	 */
	getService(service) {

		return service || '';
	}

}


export default DockerHandler;
