import BaseHandler from './../Handler';


/**
 * Brew Handler Class.
 *
 * @memberof app.handlers
 */
class Handler extends BaseHandler {

	/**
	 * Service Base Name.
	 *
	 * @returns {string} - The service Base Name.
	 * @abstract
	 */
	get name() {
		return 'BrewHandler';
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
		return 'brew';
	}

	/**
	 * @inheritdoc
	 */
	async start(...parameters) {
		await this.spawn('brew', `services start ${this.getService(...parameters)}`, true);

		return {
			message: `${this.getService(...parameters)} is started.`
		};
	}

	/**
	 * @inheritdoc
	 */
	async restart(...parameters) {
		await this.spawn('brew', `services restart ${this.getService(...parameters)}`, true);

		return {
			message: `${this.getService(...parameters)} is restarted.`
		};
	}

	/**
	 * @inheritdoc
	 */
	async stop(...parameters) {
		await this.spawn('brew', `services stop ${this.getService(...parameters)}`, true);

		return {
			message: `${this.getService(...parameters)} is stopped.`
		};
	}

	/**
	 * @inheritdoc
	 */
	async status(...parameters) {
		const serviceName = this.getService(...parameters);
		const serviceOptions = serviceName !== 'brew' ? `| sed -e '1p' -e '/${serviceName}/!d'` : '';

		await this.spawn('bash', ['-c', `brew services list ${serviceOptions}`], true);
	}

	/**
	 * @inheritdoc
	 */
	get privileged() {
		return false;
	}

	/**
	 * @inheritdoc
	 */
	getService() {
		return this.serviceName || '';
	}

}

export default Handler;
