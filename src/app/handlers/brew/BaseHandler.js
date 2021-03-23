import Handler from './../Handler';


/**
 * Brew Handler Class.
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
	async start(...parameters) {
		await this.spawn('brew', `services start ${this.getServiceCommand(...parameters)}`, true);

		return {
			message: `${this.getServiceCommand(...parameters)} is started.`
		};
	}

	/**
	 * @inheritdoc
	 */
	async restart(...parameters) {
		await this.spawn('brew', `services restart ${this.getServiceCommand(...parameters)}`, true);

		return {
			message: `${this.getServiceCommand(...parameters)} is restarted.`
		};
	}

	/**
	 * @inheritdoc
	 */
	async stop(...parameters) {
		await this.spawn('brew', `services stop ${this.getServiceCommand(...parameters)}`, true);

		return {
			message: `${this.getServiceCommand(...parameters)} is stopped.`
		};
	}

	/**
	 * @inheritdoc
	 */
	async status(...parameters) {
		const serviceName = this.getServiceCommand(...parameters);
		const serviceOptions = serviceName !== 'brew' ? `| sed -e '1p' -e '/${serviceName}/!d'` : '';

		await this.spawn('bash', ['-c', `brew services list ${serviceOptions}`.trim()], true);
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
	getServiceCommand(...parameters) {
		return (this.serviceName || '') + parameters.join(' ');
	}

}

export default BaseHandler;
