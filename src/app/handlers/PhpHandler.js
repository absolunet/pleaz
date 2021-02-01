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
		return ['terminal', 'file', 'file.system.sync'];
	}

	/**
	 * Get Binary Path.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {string} - Return PHP binary path.
	 */
	getBinaryPath(version = null) {
		this.ensureVersionExists(version);

		return this.terminal.process.runAndGet(`brew --prefix php@${version || this.getCurrentVersion()}`);
	}

	/**
	 * Start PHP-FPM service.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {Promise} The async process promise.
	 */
	async start(version = null) {
		await this.spawn(`${this.getBinaryPath(version)}/sbin/php-fpm`, '-D', true);
	}

	/**
	 * Restart PHP-FPM service.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {Promise} The async process promise.
	 */
	async restart(version = null) {
		await this.stop(version);
		await this.start(version);
	}

	/**
	 * Stop PHP-FPM service.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {Promise} The async process promise.
	 */
	async stop(version = null) {
		await this.spawn('pkill -f', `${this.getBinaryPath(version)}/sbin/php-fpm`, true);
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
	 * Disable PHP extension Xdebug.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async xdebugDisable() {
		if (!this.isXdebugEnable()) {
			throw new CustomError(`Xdebug has already been disabled.`);
		}

		await this.toggleXdebug(false);
	}

	/**
	 * Enable PHP extension Xdebug.
	 *
	 * @returns {Promise} The async process promise.
	 */
	async xdebugEnable() {
		if (this.isXdebugEnable()) {
			throw new CustomError(`Xdebug has already been enabled.`);
		}

		await this.toggleXdebug(true);
	}

	/**
	 * Toggle PHP extension Xdebug.
	 *
	 * @param {boolean} enable - Enable/Disable parameters.
	 * @returns {Promise} The async process promise.
	 */
	async toggleXdebug(enable) {
		const enableFile = `${this.getIniFilesPath()}/ext-xdebug.ini`;
		const disableFile = `${enableFile}.dis`;

		return await enable
			? this.fileSystemSync.rename(disableFile, enableFile)
			: this.fileSystemSync.rename(enableFile, disableFile);
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
