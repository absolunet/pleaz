//--------------------------------------------------------
//-- Node IoC - Command - Test docker-compose file Command
//--------------------------------------------------------

import DockerCommand from './DockerCommand';


/**
 * Test docker-compose file Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.DockerCommand
 */
class DockerTestCommand extends DockerCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'docker:test';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Validate and view the docker-compose.yml file';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.docker.test();
	}

}


export default DockerTestCommand;
