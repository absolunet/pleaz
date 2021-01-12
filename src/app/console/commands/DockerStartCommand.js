//--------------------------------------------------------
//-- Node IoC - Command - Start docker-compose Command
//--------------------------------------------------------

import DockerCommand from './DockerCommand';


/**
 * Start docker-compose Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.DockerCommand
 */
class DockerStartCommand extends DockerCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'docker:start';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Start Docker containers via Docker Compose.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.docker.start(this.parameter('service'));
	}

}


export default DockerStartCommand;
