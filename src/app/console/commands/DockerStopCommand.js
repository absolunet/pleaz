//--------------------------------------------------------
//-- Node IoC - Command - Stop docker-compose Command
//--------------------------------------------------------

import DockerCommand from './DockerCommand';


/**
 * Stop docker-compose Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.DockerCommand
 */
class DockerStopCommand extends DockerCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'docker:stop';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Stop Docker containers via Docker Compose.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.docker.stop(this.parameter('service'));
	}

}


export default DockerStopCommand;
