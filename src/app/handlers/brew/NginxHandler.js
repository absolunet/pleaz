import fs from 'fs';
import { exec } from 'child_process';
import BaseHandler from './BaseHandler';
import CustomError from '../../exceptions/CustomError';

/**
 * NGINX Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BaseHandler
 */
class NginxHandler extends BaseHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'nginx';
	}

	/**
	 *  Get Server configuration path.
	 *
	 * @returns {string} - Server configuration path.
	 */
	get serverConfigPath() {
		return '/usr/local/etc/nginx/servers';
	}

	/**
	 * Get web server path.
	 *
	 * @returns {string} - Web server path.
	 */
	get webServerPath() {
		return '/usr/local/var/www';
	}

	/**
	 * @inheritdoc
	 */
	async start() {
		await this.test();
		await super.start();

		return {
			message: `${this.serviceName} is started.`
		};
	}

	/**
	 * @inheritdoc
	 */
	async restart() {
		await this.test();
		await super.restart();

		return {
			message: `${this.serviceName} is restarted.`
		};
	}

	get serversDirectory() {
		return '/usr/local/etc/nginx/servers';
	}

	get serviceDir() {
		return '/services/nginx';
	}

	async doctor() {
		const serviceBaseDir = `${process.cwd()}/config/pleaz/${this.serviceDir}`;
		const serverNames = this.getServerNamesInDirectory(serviceBaseDir);

		const configDirectory = `${process.cwd()}/config/pleaz`;
		const serverBlocksMessages = this.validateServerBlocks(configDirectory, serverNames);
		const confFilesMessages = this.validateConfFiles(configDirectory, serverNames);
		await this.test({ quiet: true });
		this.validateWebrootsForProject(serverNames);

		const messages = [
			...serverBlocksMessages,
			...confFilesMessages,
		];

		return {
			messages
		};
	}

	/**
	 * Test NGINX service.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async test({
		quiet = false,
	}) {
		await this.spawn(`nginx`, `-t${quiet ? 'q' : ''}`, true);
	}

	/**
	 *
	 * @param configDirectory string
	 * @param serverNames string[]
	 */
	validateServerBlocks(configDirectory, serverNames) {
		const serviceBaseDir = `${configDirectory}${this.serviceDir}`;

		return serverNames.reduce((messages, serverName) => {
			const message = this.validateServerBlockSymlinks(serviceBaseDir, serverName);

			if (message) {
				messages.push(message);
			}

			return messages;
		}, []);
	}

	validateConfFiles(configDirectory, serverName) {
		const files = ['server.conf', 'includes/sites.conf'];

		return files.reduce((messages, file) => {
			const path = `${configDirectory}${this.serviceDir}/${serverName}/${file}`;

			if (!fs.existsSync(path)) {
				messages.push(`Config file was not found: ${path}`);
			}

			return messages;
		}, []);
	}

	validateServerBlockSymlinks(serviceBaseDir, serverName) {
		const intendedTarget = `${serviceBaseDir}/${serverName}/`;
		const symlinkPath = `${this.serversDirectory}/${serverName}`;
		let actualTarget;

		try {
			actualTarget = fs.readlinkSync(symlinkPath);

			if (actualTarget !== intendedTarget) {
				return `Symlink ${symlinkPath} should have target ${intendedTarget} - found: ${actualTarget}`;
			}
		} catch (err) {
			if (err.message.startsWith('ENOENT: no such file or directory')) {
				return `Missing symlink ${symlinkPath} with target ${intendedTarget}`;
			}

			throw new CustomError(`An unexpected error occurred while reading symlink ${symlinkPath}: "${err.message}"`);
		}
	}

	/**
	 *
	 * @param serviceBaseDir
	 * @returns {string[]}
	 */
	getServerNamesInDirectory(serviceBaseDir) {
		if (!fs.existsSync(serviceBaseDir)) {
			throw new Error('Directory services/nginx does not exist. Please validate project structure');
		}

		if (!fs.statSync(serviceBaseDir).isDirectory()) {
			throw new Error('services/nginx should be a directory. Please validate project file structure');
		}

		const nginxSubdirectories = fs.readdirSync(serviceBaseDir);

		return nginxSubdirectories.filter((entry) => (
			fs.statSync(`${serviceBaseDir}/${entry}`).isDirectory()
		));
	}
}


export default NginxHandler;
