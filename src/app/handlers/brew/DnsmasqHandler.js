import BaseHandler from './BaseHandler';

/**
 * Dnsmasq Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BaseHandler
 */
class DnsmasqHandler extends BaseHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'dnsmasq';
	}

}


export default DnsmasqHandler;
