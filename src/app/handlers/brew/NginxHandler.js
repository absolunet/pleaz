import { isAbsolute } from 'path';
import BaseHandler from './BaseHandler';

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
	static get dependencies() {
		return [
			...super.dependencies,
			'file'
		];
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
	get serviceName() {
		return 'nginx';
	}

	/**
	 * Inspect server blocks and document roots and tests NGINX.
	 *
	 * @returns {Promise<{messages: Array<string>}>} Validation messages.
	 */
	async doctor() {
		const serverBlocksMessages = this.getServerBlocksMessages();
		const documentRootsMessages = this.getDocumentRootsMessages();
		const nginxTestOutput = await this.getNginxMessages();

		return {
			messages: [
				{
					title: 'Checking configured server blocks',
					message: [...serverBlocksMessages]
				},
				{
					title: 'Checking configured document roots',
					message: [...documentRootsMessages]
				},
				{
					title: `Testing ${this.serviceName.toUpperCase()}`,
					message: [nginxTestOutput]
				}
			]
		};
	}

	/**
	 * @inheritdoc
	 */
	async start(...parameters) {
		await this.test();
		await super.start(...parameters);

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

	/**
	 * Test NGINX service.
	 *
	 * @param {boolean} useOutput - Set to yes to retrieve the output from the spawned command.
	 * @returns {Promise<string | void>} The async process promise.
	 */
	test(useOutput = false) {
		if (useOutput) {
			return this.spawnSync('nginx', '-t', true);
		}

		return this.spawn('nginx', '-t', true);
	}

	/**
	 * Checks whether a directory exists or not.
	 *
	 * @param {string} directoryAbsolutePath - The absolute path of the directory to test.
	 *
	 * @returns {boolean} True if directory exists, false otherwise.
	 */
	isDirectoryExists(directoryAbsolutePath) {
		return this.file.engine.exists(directoryAbsolutePath);
	}

	/**
	 * Get validation messages from NGINX.
	 *
	 * @returns {Array<string>} Output from the nginx command.
	 */
	getNginxMessages() {
		const processResult = this.test(true);
		// nginx will only output to stdErr
		const output = processResult.stderr.toString();

		if (output.includes('test failed')) {
			return [
				`One or more errors occurred while testing ${this.serviceName.toUpperCase()}` +
				'\n',
				output
			];
		}

		return [
			output
		];
	}

	/**
	 * Get validation messages for document roots.
	 *
	 * @returns {Array<string>} Success/Error message resulting from document root validation.
	 */
	getDocumentRootsMessages() {
		const messages = this.validateDocumentRootSymlinks();

		if (messages.length === 0) {
			messages.push('No document root found');
		}

		return messages;
	}

	/**
	 * Get validation messages for server blocks.
	 *
	 * @returns {Array<string>} Success/Error message resulting from server blocks validation.
	 */
	getServerBlocksMessages() {
		const messages = this.validateServerBlocks();

		if (messages.length === 0) {
			messages.push('No server block found');
		}

		return messages;
	}

	/**
	 * Check that symlinks' targets in the document roots directory are absolute paths, and return messages related to that validation.
	 *
	 * @returns {Array<string>} Messages resulting from validation.
	 */
	validateDocumentRootSymlinks() {
		return this.validateSymlinks(this.getSymlinksFromDirectory(this.webServerPath));
	}

	/**
	 * Validates that the provided symlinks have an absolute path as a target.
	 *
	 * @param {Array<{ symlink: string, target: string }>} symlinks - Symlinks to validate.
	 * @returns {Array<string>} A list of error/success messages.
	 */
	validateSymlinks(symlinks) {
		return symlinks.map(({ symlink, target }) => {
			if (!this.isPathAbsolute(target)) {
				return `Symlink "${symlink}" should have an absolute path as a target. Current target: "${target}"`;
			}

			const targetInfo = !this.isDirectoryExists(target) ? ', but target directory was not found' : '';

			return `Found symlink "${symlink}" with target path "${target}"${targetInfo}`;
		});
	}

	/**
	 * Validates the server blocks found in the NGINX directory.
	 *
	 * @returns {Array<string>} Array of success/error messages from server blocks validation.
	 */
	validateServerBlocks() {
		return this.validateSymlinks(this.getSymlinksFromDirectory(this.serverConfigPath));
	}

	/**
	 * Checks whether or not a path is an absolute path.
	 *
	 * @param {string} path - The path to validate.
	 * @returns {boolean} True if path is absolute, false otherwise.
	 */
	isPathAbsolute(path) {
		return isAbsolute(path);
	}

	/**
	 * Lists all of the symlinks in a directory.
	 *
	 * @param {string} directory - The directory in which to look for symlinks.
	 *
	 * @returns {Array<{ symlink: string, target: string }>} Array objects containing the symlink path and its target.
	 */
	getSymlinksFromDirectory(directory) {
		const directoryEntries = this.file.engine.readdir(directory);

		return directoryEntries.reduce((symlinks, directoryEntry) => {
			const path = `${directory}/${directoryEntry}`;
			const link = this.file.engine.lstat(path);

			if (link.isSymbolicLink()) {
				const target = this.file.engine.readlink(path);
				symlinks.push({
					symlink: path,
					target
				});
			}

			return symlinks;
		}, []);
	}

}

export default NginxHandler;
