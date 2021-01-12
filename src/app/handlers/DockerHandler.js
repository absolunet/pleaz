import Handler from './Handler';

/**
 * Docker Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class DockerHandler extends Handler {

	/**
	 * Start docker-compose containers.
	 *
	 * @param {string|null} service - Service container name.
	 * @returns {Promise} The async process promise.
	 */
	async start(service = null) {
		await this.spawn('docker-compose', `up --detach ${this.getService(service)}`);
	}

	/**
	 * Restart docker-compose containers.
	 *
	 * @param {string|null} service - Service container name.
	 * @returns {Promise} The async process promise.
	 */
	async restart(service = null) {
		await this.spawn('docker-compose', `restart ${this.getService(service)}`);
	}

	/**
	 * Stop docker-compose containers.
	 *
	 * @param {string|null} service - Service container name.
	 * @returns {Promise} The async process promise.
	 */
	async stop(service = null) {
		await this.spawn('docker-compose', `stop ${this.getService(service)}`);
	}

	/**
	 * Clean docker-compose containers.
	 *
	 * @param {string|null} service - Service container name.
	 * @returns {Promise} The async process promise.
	 */
	async clean(service = null) {
		await this.spawn('docker-compose', service ? `rm --stop -v ${service}` : 'down');
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
