//--------------------------------------------------------
//-- Node IoC - Command - Start Service Command
//--------------------------------------------------------

import ServiceCommand from './ServiceCommand';

/**
 * Start Service Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.ServiceCommand
 */
class ServiceStartCommand extends ServiceCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'service:start';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return `Start service [${this.SERVICES.join(', ')}].`;
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		const { message } = await this.service.start(this.parameter('serviceVersion'));
		this.success(message);
	}

}


export default ServiceStartCommand;
