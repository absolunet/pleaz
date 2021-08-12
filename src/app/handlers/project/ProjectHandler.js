import Handler     from './../Handler';
import CustomError from '../../exceptions/CustomError';

/**
 * Project Handler Class.
 *
 * @memberof app.handlers
 */
class ProjectHandler extends Handler {

	/**
	 * Service Base Name.
	 *
	 * @returns {string} - The service Base Name.
	 * @abstract
	 */
	get name() {
		return 'ProjectHandler';
	}

	/**
	 * @inheritdoc
	 */
	static get dependencies() {
		return ['app', 'file'];
	}

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'project';
	}

	/**
	 * @inheritdoc
	 */
	getServiceCommand(...parameters) {
		return (this.serviceName || '') + parameters.join(' ');
	}

	/**
	 * Get docker compose file directory.
	 *
	 * @returns {string} - Return docker compose file directory.
	 */
	get pleazConfigDirectory() {
		return 'config/pleaz/macos';
	}

	/**
	 * Get project server block configuration.
	 *
	 * @returns {string} - Get project server block configuration.
	 */
	get nginxConfigDirectory() {
		return 'services/nginx';
	}

	/**
	 * Ensure to be in Pleaz config directory.
	 *
	 * @throws {CustomError} If current directory is not valid.
	 */
	ensureIsPleazConfigDirectory() {
		if (!process.cwd().endsWith(this.pleazConfigDirectory)) {
			throw new CustomError(`You must be in "${this.pleazConfigDirectory}" directory.`);
		}
	}

	/**
	 * Get project code source path.
	 *
	 * @returns {string} - Return project code source path.
	 */
	get webProjectRoot() {
		return this.app.formatPath(process.cwd(), '../../..');
	}

	/**
	 * Get Domain names from directory.
	 *
	 * @param {string} directory - Directory.
	 * @returns {Promise<*>} - Return domain names list from directory.
	 */
	getDomainNamesListFromDirectory(directory) {
		return this.file.engine.readdir(directory);
	}

	/**
	 * Create Symlinks for web server block.
	 *
	 * @returns {Promise<{message: string}>} The async process promise.
	 */
	async createSymlinks() {
		await this.ensureIsPleazConfigDirectory();

		const nginxHandler = this.app.make('handler.nginx', { command: this });
		const listDirectories = await this.getDomainNamesListFromDirectory(this.nginxConfigDirectory);

		listDirectories.forEach((domainName) => {
			// - Create Symlink /usr/local/etc/nginx/servers/{domainName}
			this.spawn('ln', `-sfn ${process.cwd()}/${this.nginxConfigDirectory}/${domainName} ${nginxHandler.serverConfigPath}/`);
			// - Create Symlink /usr/local/var/www/{domainName}
			this.spawn('ln', `-sfn ${this.webProjectRoot}/ ${nginxHandler.webServerPath}/${domainName}`);
		});

		return {
			message: `Symbolic links have been created.`
		};
	}

}

export default ProjectHandler;
