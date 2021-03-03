import Handler from './../Handler';


/**
 * Docker Handler Class.
 *
 * @memberof app.handlers
 */
class BaseHandler extends Handler {

	/**
	 * Service Base Name.
	 *
	 * @returns {string} - The service Base Name.
	 * @abstract
	 */
	get name() {
		return 'DockerHandler';
	}

	/**
	 * @inheritdoc
	 */
	static get dependencies() {
		return ['app'];
	}

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'docker';
	}

	/**
	 * @inheritdoc
	 */
	async start() {
		await this.spawn('docker-compose', `up --detach ${this.getServiceCommand()}`);

		return {
			message: `${this.getServiceCommand() || 'docker'} is started.`
		};
	}

	/**
	 * @inheritdoc
	 */
	async stop() {
		const serviceName = this.getServiceCommand();
		await (serviceName
			? this.spawn('docker-compose', `rm --stop --force -v ${serviceName}`)
			: this.spawn('docker-compose', `down`));

		return {
			message: `${serviceName || 'docker'} is stopped.`
		};
	}

	/**
	 * @inheritdoc
	 */
	async restart() {
		await this.spawn('docker-compose', `restart ${this.getServiceCommand()}`);

		return {
			message: `${this.getServiceCommand() || 'docker'} is restarted.`
		};
	}

	/**
	 * @inheritdoc
	 */
	async status(...parameters) {
		const serviceName = this.getServiceCommand(...parameters);
		const serviceOptions = serviceName ? `| sed -e '1p' -e '/${serviceName}/!d'` : '';
		await this.spawn('bash', ['-c', `docker-compose ps ${serviceOptions}`], false);
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
	 * @inheritdoc
	 */
	getServiceCommand() {
		return this.serviceName || '';
	}

}

export default BaseHandler;
