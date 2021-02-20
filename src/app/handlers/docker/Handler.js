import BaseHandler from './../Handler';


/**
 * Docker Handler Class.
 *
 * @memberof app.handlers
 */
class Handler extends BaseHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return '';
	}

	/**
	 * @inheritdoc
	 */
	async start() {
		await this.spawn('docker-compose', `up --detach ${this.getService()}`);

		return {
			message: `${this.getService() || 'docker'} is started.`
		};
	}

	/**
	 * @inheritdoc
	 */
	async stop() {
		const serviceName = this.getService();
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
		await this.spawn('docker-compose', `restart ${this.getService()}`);

		return {
			message: `${this.getService() || 'docker'} is restarted.`
		};
	}

	/**
	 * @inheritdoc
	 */
	async status() {
		await this.spawn('docker', ['ps', '--all']);
	}

	/**
	 * @inheritdoc
	 */
	getService() {
		return this.serviceName || '';
	}

}

export default Handler;
