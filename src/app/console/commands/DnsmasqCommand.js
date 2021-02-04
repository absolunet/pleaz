//--------------------------------------------------------
//-- Node IoC - Command - DnsmasqCommand
//--------------------------------------------------------

import { Command } from '@absolunet/ioc';
import __ from '@absolunet/private-registry';

/**
 * Dnsmasq Base command.
 *
 * @memberof app.console.commands
 * @augments ioc.console.Command
 * @abstract
 */
class DnsmasqCommand extends Command {

	/**
	 * @inheritdoc
	 */
	static get abstract() {
		return this === DnsmasqCommand;
	}

	/**
	 * Get dnsmasq Handler Instance.
	 *
	 * @type {app.handler.DnsmasqHandler}
	 */
	get dnsmasq() {
		if (!__(this).get('dnsmasq')) {
			__(this).set('dnsmasq', this.app.make('handler.dnsmasq', { command: this }));
		}

		return __(this).get('dnsmasq');
	}

}


export default DnsmasqCommand;
