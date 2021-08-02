//--------------------------------------------------------
//-- Node IoC - Command - List PHP
//--------------------------------------------------------

import ProjectCommand from './ProjectCommand';

/**
 * ProjectSetupCommand.
 */
class ProjectSetupCommand extends ProjectCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'project:setup';
	}

	/**
	 * @inheritdoc
	 */
	get parameters() {
		return [];
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Setup a project - Create a symlink for NGINX.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		const { message } = await this.project.setup();

		// Restart Nginx
		await this.call(`service:restart nginx`);

		this.success(message);
	}

}


export default ProjectSetupCommand;
