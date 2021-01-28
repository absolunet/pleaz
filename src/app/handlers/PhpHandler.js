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
		return ['terminal', 'config'];
	}

	/**
	 * Get Binary Path.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {string} - Return PHP binary path.
	 */
	getBinaryPath(version = null) {
		this.ensureVersionExists(version);

		return !version
			? 'php-fpm'
			: `${this.config.get('pleaz.brew_binary_path')}/php@${version}/sbin/php-fpm`;
	}

	/**
	 * Start PHP-FPM service.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {Promise} The async process promise.
	 */
	async start(version = null) {
		await this.spawn(this.getBinaryPath(version), '-D', true);
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
		await this.spawn('pkill -f', this.getBinaryPath(version), true);
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

		await this.spawn('brew', 'unlink php');
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
			return this.getFullVersion(version.split('php@').pop());
		});
	}

	/**
	 * Get PHP full Version.
	 *
	 * @param {string|null} version - PHP Version.
	 * @returns {string} - Return PHP Version.
	 */
	getFullVersion(version = null) {
		const spawnVersion = !version ? this.command.parameter('phpVersion') : version;

		return this.terminal
			.process
			.runAndGet(`${this.getBinaryPath(spawnVersion)} -v | awk '/^PHP/{print $2}'`);
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

}


export default PhpHandler;
