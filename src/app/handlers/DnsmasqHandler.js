import Handler from './Handler';

/**
 * Dnsmasq Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class DnsmasqHandler extends Handler {

	/**
	 * Start dnsmasq service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async start() {
		await this.spawn('brew', 'services start dnsmasq');
	}

	/**
	 * Restart dnsmasq service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async restart() {
		await this.spawn('brew', 'services restart dnsmasq');
	}

	/**
	 * Stop dnsmasq service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async stop() {
		await this.spawn('brew', 'services stop dnsmasq');
	}

	/**
	 * @inheritdoc
	 */
	get privileged() {
		return true;
	}

}


export default DnsmasqHandler;
