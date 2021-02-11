//--------------------------------------------------------
//-- Node IoC - Command - Stop Services Command
//--------------------------------------------------------

import ServiceCommand from './ServiceCommand';

/**
 * Stop Services Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.ServiceCommand
 */
class ServiceStopCommand extends ServiceCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'service:stop';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return `Stop service [${this.SERVICES.join(', ')}].`;
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.service.stop(this.parameter('optionParameters'));
		this.success(`${this.parameter('service')} is stopped.`);
	}

}


export default ServiceStopCommand;
