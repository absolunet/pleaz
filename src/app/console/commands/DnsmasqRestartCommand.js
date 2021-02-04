//--------------------------------------------------------
//-- Node IoC - Command - Restart dnsmasq Command
//--------------------------------------------------------

import DnsmasqCommand from './DnsmasqCommand';

/**
 * Restart dnsmasq Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.DnsmasqCommand
 */
class DnsmasqRestartCommand extends DnsmasqCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'dnsmasq:restart';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Restart dnsmasq server.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.dnsmasq.restart();

		this.success(`dnsmasq has been restarted.`);
	}

}


export default DnsmasqRestartCommand;
