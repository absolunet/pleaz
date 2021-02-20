import Handler from './Handler';


/**
 * Docker Handler Class.
 *
 * @memberof app.handlers
 */
class DockerHandler extends Handler {

	/**
	 * Test docker-compose service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async test() {
		await this.spawn('docker-compose', 'config');
	}

}

export default DockerHandler;
