import Handler     from './Handler';
import CustomError from '../exceptions/CustomError';

/**
 * PHP Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class PhpHandler extends Handler {

	/**
	 * @inheritdoc
	 */
	static get dependencies() {
		return ['terminal', 'file.system.sync', 'config'];
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

		return this.terminal.process.runAndGet(`brew --prefix php@${parameterVersion}`);
	}

	/**
	 * Start PHP-FPM service.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {Promise} The async process promise.
	 */
	async start(version = null) {
		await this.spawn(`${this.getBinaryPath(version || this.getCurrentVersion())}/sbin/php-fpm`, '-D', true);
	}

	/**
	 * Restart PHP-FPM service.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {Promise} The async process promise.
	 */
	async restart(version = null) {
		const parameterVersion = version || this.getCurrentVersion();
		if (await this.isServiceRunning(parameterVersion)) {
			await this.stop(parameterVersion);
		}
		await this.start(parameterVersion);
	}

	/**
	 * Stop PHP-FPM service.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {Promise} The async process promise.
	 */
	async stop(version = null) {
		const parameterVersion = version || this.getCurrentVersion();

		if (!await this.isServiceRunning(parameterVersion)) {
			throw new CustomError(`Service is not running.`);
		}
		await this.spawn('pkill', `-f ${this.getBinaryPath(parameterVersion)}/sbin/php-fpm`, true);
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

		await this.spawn('brew', `unlink php@${this.getCurrentVersion()}`);
		await this.spawn('brew', `link --overwrite --force php@${version}`);
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
			return `${version} (${this.getFullVersion(version.split('php@').pop())})`;
		});
	}

	/**
	 * Get PHP full Version.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {string} - Return PHP Version.
	 */
	getFullVersion(version = null) {
		const spawnVersion = version || this.command.parameter('phpVersion');

		return this.terminal
			.process
			.runAndGet(`${this.getBinaryPath(spawnVersion)}/sbin/php-fpm -v | awk '/^PHP/{print $2}'`);
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
			throw new CustomError(`PHP '${version}' installed via Homebrew, can't be found.`);
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
	async toggleXdebug(enable) {
		if ((this.isXdebugEnable() && enable) ||
			(!this.isXdebugEnable() && !enable)
		) {
			throw new CustomError(`Xdebug has already been ${enable ? 'enabled' : 'disabled'}.`);
		}

		const enableFile = `${this.getIniFilesPath()}/ext-xdebug.ini`;
		const disableFile = `${enableFile}.dis`;

		await (enable
			? this.fileSystemSync.rename(disableFile, enableFile)
			: this.fileSystemSync.rename(enableFile, disableFile));

		await this.restart(this.getCurrentVersion());
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
	 * @returns {Promise} - Return status of service.
	 */
	isServiceRunning(version) {
		const unixSockPath = this.config.get('pleaz.unix_socket_path');
		const socketFile = `php${version || this.getCurrentVersion()}-fpm.sock`;

		return this.fileSystemSync.exists(`${unixSockPath}/${socketFile}`);
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

}


export default PhpHandler;
