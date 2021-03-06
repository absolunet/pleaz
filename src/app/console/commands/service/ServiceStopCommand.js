//--------------------------------------------------------
//-- Node IoC - Command - Stop Service Command
//--------------------------------------------------------

import ServiceCommand from './ServiceCommand';

/**
 * Stop Service Command.
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
		const { message } = await this.service.stop(this.parameter('serviceVersion'));
		this.success(message);
	}

}


export default ServiceStopCommand;
