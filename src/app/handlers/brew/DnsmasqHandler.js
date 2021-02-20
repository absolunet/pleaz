import BrewHandler from './Handler';

/**
 * Dnsmasq Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class DnsmasqHandler extends BrewHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'dnsmasq';
	}

}


export default DnsmasqHandler;
