//--------------------------------------------------------
//-- Node IoC - Command - Status Service Command
//--------------------------------------------------------

import ServiceCommand from './ServiceCommand';

/**
 * Status Service Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.ServiceCommand
 */
class ServiceStatusCommand extends ServiceCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'service:status';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return `Get specific service status.`;
	}

	/**
	 * @inheritdoc
	 */
	get parameters() {
		return [
			['service', true, null, `The service name [${Object.values(this.SERVICES).join(', ')}].`],
			['serviceVersion', false, null, `The service version, if needed.`]
		];
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.service.status(this.parameter('serviceVersion'));
	}

}


export default ServiceStatusCommand;
