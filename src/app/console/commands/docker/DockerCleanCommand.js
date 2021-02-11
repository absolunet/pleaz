//--------------------------------------------------------
//-- Node IoC - Command - Clean docker-compose Command
//--------------------------------------------------------

import DockerCommand from './DockerCommand';


/**
 * Clean docker-compose Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.DockerCommand
 */
class DockerCleanCommand extends DockerCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'docker:clean';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Clean Docker containers via Docker Compose.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.docker.clean(this.parameter('service'));
	}

}


export default DockerCleanCommand;
