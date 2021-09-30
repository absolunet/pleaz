//--------------------------------------------------------
//-- Node IoC - Command - Create symbolic links for the project
//--------------------------------------------------------

import ProjectCommand from './ProjectCommand';

/**
 * ProjectCreateSymlinksCommand.
 */
class ProjectCreateSymlinksCommand extends ProjectCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'project:create-symlinks';
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
		return 'Create symbolic links for the project.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		const { message } = await this.project.createSymlinks();

		// Restart Nginx
		await this.call(`service:restart nginx`);

		this.success(message);
	}

}


export default ProjectCreateSymlinksCommand;
