import BaseHandler from './BaseHandler';
import CustomError from '../../exceptions/CustomError';

/**
 * PHP Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BaseHandler
 */
class PhpHandler extends BaseHandler {

	/**
	 * @inheritdoc
	 */
	static get dependencies() {
		return ['terminal'];
	}

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'php';
	}

	/**
	 * Get Binary Path.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {string} - Return PHP binary path.
	 */
	getBinaryPath(version = null) {
		const parameterVersion = version || this.getCurrentVersion();
		this.ensureVersionExists(parameterVersion);

		return this.terminal.process.runAndGet(`brew --prefix ${this.serviceName}@${parameterVersion}`);
	}

	/**
	 * Start PHP-FPM service.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {Promise} Promise<{{message:string}}> - The async process promise.
	 */
	async start(version = null) {
		await super.start(version);

		return {
			message: `${this.getServiceCommand(version)} (${this.getFullVersion(version)}) is started.`
		};
	}

	/**
	 * Restart PHP-FPM service.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {Promise} Promise<{{message:string}}> - The async process promise.
	 */
	async restart(version = null) {
		await super.restart(version);

		return {
			message: `${this.getServiceCommand(version)} (${this.getFullVersion(version)}) is restarted.`
		};
	}

	/**
	 * Stop PHP-FPM service.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {Promise} Promise<{{message:string}}> - The async process promise.
	 */
	async stop(version = null) {
		await super.stop(version);

		return {
			message: `${this.getServiceCommand(version)} (${this.getFullVersion(version)}) is stopped.`
		};
	}

	/**
	 * Status PHP-FPM service.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {Promise} The async process promise.
	 */
	async status(version = null) {
		this.ensureVersionExists(version);
		await this.spawn('bash', ['-c', `brew services list | sed -e '1p' -e '/${version ? this.getServiceCommand(version) : 'php@'}/!d'`], true);
	}

	/**
	 * Switch PHP-FPM version.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {Promise} The async process promise.
	 */
	async switch(version = null) {
		if (!version) {
			throw new CustomError(`Please specify PHP version.`);
		}

		this.ensureVersionExists(version);

		await this.spawn('brew', `unlink ${this.serviceName}@${this.getCurrentVersion()}`);
		await this.spawn('brew', `link --overwrite --force ${this.serviceName}@${version}`);

		return {
			message: `php@${version} (${this.getFullVersion(version)}) has switched.`
		};
	}

	/**
	 * List PHP full version.
	 *
	 * @returns {[]} - Return List of PHP version installed.
	 */
	list() {
		const versionInstalled = this.getInstalledVersions();

		if (!versionInstalled) {
			throw new CustomError(`No version of PHP installed via Homebrew found.`);
		}

		return versionInstalled.split(' / ').map((version) => {
			return `${version} (${this.getFullVersion(version.split(`${this.serviceName}@`).pop())})`;
		});
	}

	/**
	 * Get PHP full Version.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {string} - Return PHP Version.
	 */
	getFullVersion(version = null) {
		return this.terminal
			.process
			.runAndGet(`${this.getBinaryPath(version)}/sbin/php-fpm -v | awk '/^PHP/{print $2}'`);
	}

	/**
	 * Get List of Homebrew PHP Version installed.
	 *
	 * @returns {string} - Return PHP Version.
	 */
	getInstalledVersions() {
		return this.terminal
			.process
			.runAndGet('brew list --formula | grep "^php@"; true');
	}

	/**
	 * Ensure Homebrew Version Exists.
	 *
	 * @param {string} version - PHP Version.
	 */
	ensureVersionExists(version) {
		if (version && !this.terminal.process.runAndGet(`brew list --formula | grep "^php@${version}"; true`)) {
			throw new CustomError(`PHP version '${version}' installed via Homebrew, can't be found.`);
		}
	}

	/**
	 * Get Current PHP version.
	 *
	 * @returns {string} - Return current PHP version.
	 */
	getCurrentVersion() {
		return this.terminal
			.process
			.runAndGet(`php -r 'echo PHP_MAJOR_VERSION . "." . PHP_MINOR_VERSION;'`).trim();
	}

	/**
	 * Toggle PHP extension Xdebug.
	 *
	 * @param {boolean} enable - Enable/Disable parameters.
	 * @returns {Promise} The async process promise.
	 */
	async toggleXdebug(enable = true) {
		if (this.isXdebugEnable() === enable) {
			return {
				hasWarning: true,
				restart: false,
				message: `Xdebug has already been ${enable ? 'enabled' : 'disabled'}.`
			};
		}

		const enableFile = `${this.getIniFilesPath()}/ext-xdebug.ini`;
		const disableFile = `${enableFile}.dis`;

		await (enable
			? this.spawn('mv', [disableFile, enableFile], true)
			: this.spawn('mv', [enableFile, disableFile], true));

		return {
			hasWarning: false,
			restart: true,
			message: `Xdebug has been ${enable ? 'enabled' : 'disabled'}.`
		};
	}

	/**
	 * Is Xdebug Enable.
	 *
	 * @returns {boolean} - Return status of Xdebug.
	 */
	isXdebugEnable() {
		return Boolean(this.terminal.process.runAndGet(`php -m | grep xdebug; true`));
	}

	/**
	 * Is Service PHP-FPM running.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {boolean} - Return status of service.
	 */
	async isServiceRunning(version) {
		const output = await this.terminal.process.runAndGet(`sudo brew services list | grep ${this.serviceName}@${version} | awk '{print $2}'`);

		return output === 'started';
	}

	/**
	 * Get Path .INI files.
	 *
	 * @returns {string} - Return Path .INI files.
	 */
	getIniFilesPath() {
		return this.terminal
			.process
			.runAndGet(`php --ini | grep Scan | cut -d" " -f7`).trim();
	}

	/**
	 * Get Service container name.
	 *
	 * @param {string|null} version - PHP Version.
	 * @param {...*} parameters - The given parameters.
	 * @returns {string} - Return service container name.
	 */
	getServiceCommand(version, ...parameters) {
		return `php@${version || this.getCurrentVersion()} ${parameters.join(' ')}`;
	}

}


export default PhpHandler;
