//--------------------------------------------------------
//-- Node IoC - Command - Status Services Command
//--------------------------------------------------------

import ServiceCommand from './ServiceCommand';

/**
 * Status Services Command.
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
		return `Get status services.`;
	}

	/**
	 * @inheritdoc
	 */
	get parameters() {
		return [
			['service', false, 'default', `The service name [${Object.values(this.SERVICES)}].`],
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
