//--------------------------------------------------------
//-- Node IoC - Command - Start NGINX Command
//--------------------------------------------------------

import NginxCommand from './NginxCommand';

/**
 * Start NGINX Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.NginxCommand
 */
class NginxStartCommand extends NginxCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'nginx:start';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Start NGINX server';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.nginx.test();
		await this.nginx.start();
	}

}


export default NginxStartCommand;
