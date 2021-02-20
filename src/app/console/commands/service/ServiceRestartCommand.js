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
		const { message } = await this.service.restart(this.parameter('serviceVersion'));
		this.success(message);
	}

}


export default ServiceRestartCommand;
