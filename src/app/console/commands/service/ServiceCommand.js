//--------------------------------------------------------
//-- Node IoC - Command - ServicesCommand
//--------------------------------------------------------

import { Command } from '@absolunet/ioc';
import __          from '@absolunet/private-registry';
import CustomError from '../../../exceptions/CustomError';

/**
 * Services Base command.
 *
 * @memberof app.console.commands
 * @augments ioc.console.Command
 * @abstract
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
			['service', true, null, `The service name [${this.SERVICES.join(', ')}].`],
			['serviceVersion', false, null, `The service version, if needed.`]
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
			} catch {
				throw new CustomError(`'${this.parameter('service')}' does not exist.`);
			}
		}

		return __(this).get('service');
	}

}


export default ServiceCommand;
