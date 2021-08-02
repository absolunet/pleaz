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
		return ['app', 'terminal', 'file', 'path'];
	}

	/**
	 * @inheritdoc
	 */
	get privileged() {
		return false;
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
	 *  Get Server configuration path.
	 *
	 * @returns {string} - Server configuration path.
	 */
	get nginxConfigServerPath() {
		return '/usr/local/etc/nginx/servers';
	}

	/**
	 * Get Server Web Root path.
	 *
	 * @returns {string} - Server Web Root path.
	 */
	get nginxWebPath() {
		return '/usr/local/var/www';
	}

	/**
	 * Get docker compose file directory.
	 *
	 * @returns {string} - Return docker compose file directory.
	 */
	get dockerComposeDirectory() {
		return 'config/pleaz/macos';
	}

	/**
	 * Get project server block configuration.
	 *
	 * @returns {string} - Get project server block configuration.
	 */
	get nginxConfigServicePath() {
		return `${this.dockerComposeDirectory}/services/nginx`;
	}

	/**
	 * Ensure to be in docker-compose file directory.
	 *
	 * @throws {CustomError} If current directory is not valid.
	 */
	ensureToBeDockerComposeFileDirectory() {
		if (!this.cwd.endsWith(this.dockerComposeDirectory)) {
			throw new CustomError(`You must be in "${this.dockerComposeDirectory}" directory.`);
		}
	}

	/**
	 * Get current directory.
	 *
	 * @returns {string} - Return current directory.
	 */
	get cwd() {
		return process.cwd();
	}

	/**
	 * Get project code source path.
	 *
	 * @returns {string} - Return project code source path.
	 */
	get webRoot() {
		return `${this.cwd}/../../../`;
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
	 * Change current directory.
	 *
	 * @param {string} directory - Directory.
	 */
	changeCurrentDirectory(directory) {
		process.chdir(directory);
	}

	/**
	 * Setup project for Web Server Block.
	 *
	 * @returns {Promise<{message: string}>} The async process promise.
	 */
	async setup() {
		await this.ensureToBeDockerComposeFileDirectory();

		// Change directory to webroot
		await this.changeCurrentDirectory(this.webRoot);

		const configServiceDirectory = this.path.resolve(this.nginxConfigServicePath);
		const listDirectories = await this.getDomainNamesListFromDirectory(configServiceDirectory);

		listDirectories.forEach((domainName) => {
			// - Create Symlink /usr/local/etc/nginx/servers/{domainName}
			this.spawn('ln', `-sfn ${configServiceDirectory}/${domainName} ${this.nginxConfigServerPath}/`);

			// - Create Symlink /usr/local/var/www/{domainName}
			this.spawn('ln', `-sfn ${this.cwd}/ ${this.nginxWebPath}/${domainName}`);
		});

		return {
			message: `Symbolic links for server blocks have been created.`
		};
	}

}

export default ProjectHandler;
