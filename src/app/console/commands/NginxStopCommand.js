//--------------------------------------------------------
//-- Node IoC - Command - Stop NGINX Command
//--------------------------------------------------------

import NginxCommand from './NginxCommand';


/**
 * Stop NGINX Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.NginxCommand
 */
class NginxStopCommand extends NginxCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'nginx:stop';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Stop NGINX server';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.nginx.stop();
	}

}


export default NginxStopCommand;
