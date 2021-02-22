import BrewHandler from './Handler';

/**
 * Dnsmasq Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BrewHandler
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
