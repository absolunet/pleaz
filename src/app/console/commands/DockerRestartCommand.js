//--------------------------------------------------------
//-- Node IoC - Command - Restart docker-compose Command
//--------------------------------------------------------

import DockerCommand from './DockerCommand';


/**
 * Restart docker-compose Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.DockerCommand
 */
class DockerRestartCommand extends DockerCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'docker:restart';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Restart Docker containers via Docker Compose.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.docker.restart(this.parameter('service'));
	}

}


export default DockerRestartCommand;
