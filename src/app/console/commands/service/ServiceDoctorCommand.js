//--------------------------------------------------------
//-- Pleaz - Command - ServiceDoctorCommand
//--------------------------------------------------------

import ServiceCommand from './ServiceCommand';


/**
 * ServiceDoctorCommand.
 */
class ServiceDoctorCommand extends ServiceCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'service:doctor';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Run doctor on a service to discover problems';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		if (!this.service.doctor) {
			this.info(`No doctor available for service ${this.parameter('service')}`);
			return;
		}

		const { messages } = await this.service.doctor();
		this.info(this.getFormattedMessages(messages));

		return {
			messages,
		};
	}

	getFormattedMessages(messages) {
		return messages.filter(Boolean).join('\n');
	}
}


export default ServiceDoctorCommand;
