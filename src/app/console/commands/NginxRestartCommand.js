//--------------------------------------------------------
//-- Node IoC - Command - Restart NGINX Command
//--------------------------------------------------------

import NginxCommand from './NginxCommand';


/**
 * Restart NGINX Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.NginxCommand
 */
class NginxRestartCommand extends NginxCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'nginx:restart';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Restart NGINX server';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.nginx.restart();
	}

}


export default NginxRestartCommand;
