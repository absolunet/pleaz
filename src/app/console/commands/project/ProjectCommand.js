//--------------------------------------------------------
//-- Node IoC - Command - ProjectCommand
//--------------------------------------------------------

import { Command } from '@absolunet/ioc';

/**
 * Project Base command.
 *
 * @memberof app.console.commands
 * @augments ioc.console.Command
 * @abstract
 */
class ProjectCommand extends Command {

	/**
	 * @inheritdoc
	 */
	static get abstract() {
		return this === ProjectCommand;
	}

	/**
	 * Make a Setup Handler Instance.
	 *
	 * @returns {app.handler.ProjectHandler} SetupHandler Instance.
	 */
	get project() {
		return this.app.make('handler.project', { command: this });
	}

}


export default ProjectCommand;
