//--------------------------------------------------------
//-- Node IoC - Command - Restart Services Command
//--------------------------------------------------------

import ServiceCommand from './ServiceCommand';

/**
 * Restart Services Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.ServiceCommand
 */
class ServiceRestartCommand extends ServiceCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'service:restart';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return `Restart service [${this.SERVICES.join(', ')}].`;
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.service.restart(this.parameter('optionParameters'));
		this.success(`${this.parameter('service')} is restarted.`);
	}

}


export default ServiceRestartCommand;
