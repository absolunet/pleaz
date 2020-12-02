//--------------------------------------------------------
//-- Node IoC - Command - docker
//--------------------------------------------------------

import { Command } from '@absolunet/ioc';

/**
 * Docker Base command.
 *
 * @memberof app.console.commands
 * @augments ioc.console.Command
 * @abstract
 */
class DockerCommand extends Command {

	/**
	 * @inheritdoc
	 */
	static get abstract() {
		return this === DockerCommand;
	}

	/**
	 * @inheritdoc
	 */
	get parameters() {
		return [
			['service', false, null, 'Service Container name']
		];
	}

	/**
	 * Make a docker Handler Instance.
	 *
	 * @returns {app.handler.DockerHandler} DockerHandler Instance.
	 */
	get docker() {
		return this.app.make('handler.docker', { command: this });
	}

}


export default DockerCommand;
