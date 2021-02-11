//--------------------------------------------------------
//-- Node IoC - Command - ServicesCommand
//--------------------------------------------------------

import { Command } from '@absolunet/ioc';
import __ from '@absolunet/private-registry';
import CustomError from '../../../exceptions/CustomError';

/**
 * Services Base command.
 *
 * @memberof app.console.commands
 * @augments ioc.console.Command
 *
 */
class ServiceCommand extends Command {

	/**
	 * @inheritdoc
	 */
	static get abstract() {
		return this === ServiceCommand;
	}

	/**
	 * Status Parameters.
	 *
	 * @returns {{enable: Function, disable: Function, status: Function}} - Status Parameters available.
	 */
	get SERVICES() {
		return this.app.getBounds().filter((name) => {
			return name.startsWith('handler.');
		}).map((name) => {
			return name.replace('handler.', '');
		});
	}

	/**
	 * @inheritdoc
	 */
	get parameters() {
		return [
			['service', true, null, `Specify a service [${Object.values(this.SERVICES)}].`],
			['optionParameters', false, null, `Optional parameters`]
		];
	}

	/**
	 * Get Service Handler Instance.
	 *
	 * @type {app.handler.ServiceHandler}
	 */
	get service() {
		if (!__(this).get('service')) {
			try {
				__(this).set('service', this.app.make(`handler.${this.parameter('service')}`, { command: this }));
			} catch (error) {
				throw new CustomError(`'${this.parameter('service')}' is not exists. Specify a service [${this.SERVICES.join(', ')}].`);
			}
		}

		return __(this).get('service');
	}

}


export default ServiceCommand;
