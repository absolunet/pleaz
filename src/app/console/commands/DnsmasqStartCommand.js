//--------------------------------------------------------
//-- Node IoC - Command - Start dnsmasq Command
//--------------------------------------------------------

import DnsmasqCommand from './DnsmasqCommand';

/**
 * Start dnsmasq Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.DnsmasqCommand
 */
class DnsmasqStartCommand extends DnsmasqCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'dnsmasq:start';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Start dnsmasq server.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.dnsmasq.start();

		this.success(`dnsmasq has been started.`);
	}

}


export default DnsmasqStartCommand;
