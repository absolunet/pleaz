//--------------------------------------------------------
//-- Node IoC - Command - NginxCommand
//--------------------------------------------------------

import { Command } from '@absolunet/ioc';
import __ from '@absolunet/private-registry';

/**
 * NGINX Base command.
 *
 * @memberof app.console.commands
 * @augments ioc.console.Command
 * @abstract
 */
class NginxCommand extends Command {

	/**
	 * @inheritdoc
	 */
	static get abstract() {
		return this === NginxCommand;
	}

	/**
	 * Get NGINX Handler Instance.
	 *
	 * @type {app.handler.NginxHandler}
	 */
	get nginx() {
		if (!__(this).get('nginx')) {
			__(this).set('nginx', this.app.make('handler.nginx', { command: this }));
		}

		return __(this).get('nginx');
	}

}


export default NginxCommand;
