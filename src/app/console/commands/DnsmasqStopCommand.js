//--------------------------------------------------------
//-- Node IoC - Command - Stop dnsmasq Command
//--------------------------------------------------------

import DnsmasqCommand from './DnsmasqCommand';

/**
 * Stop dnsmasq Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.DnsmasqCommand
 */
class DnsmasqStopCommand extends DnsmasqCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'dnsmasq:stop';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Stop dnsmasq server.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.dnsmasq.stop();

		this.success(`dnsmasq has been stopped.`);
	}

}


export default DnsmasqStopCommand;
