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
	get parameters() {
		return [
			['service', false, null, 'The service name [nginx].']
		];
	}

	/**
	 * The list of sub commands to run.
	 *
	 * @returns {Array<string>} A list of commands to run.
	 */
	get subCommandsList() {
		return [
			// from brew handler
			'service:status dnsmasq',
			'service:status container',
			'service:status mailhog',
			'service:status nginx',
			'service:status php',

			// doctor
			'service:doctor nginx',

			// php
			'php:list',
			'php:xdebug'
		];
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		const serviceName = this.parameter('service');

		if (serviceName) {
			const { messages } = await this.service.doctor();
			messages.forEach((value) => {
				this.info(value.title);
				this.terminal
					.echo(value.message.join('\n'))
					.spacer(1);
			});

			return;
		}

		await this.runGlobalDoctor();
	}

	/**
	 * Runs all doctor subcommands.
	 *
	 * @returns {Promise<void>}
	 */
	async runGlobalDoctor() {
		/* eslint-disable no-await-in-loop */
		for (const subCommand of this.subCommandsList) {
			this.info(`Running ${subCommand}`);
			await this.call(subCommand);
			this.terminal.spacer(2);
		}
		/* eslint-enable no-await-in-loop */
	}

}


export default ServiceDoctorCommand;
