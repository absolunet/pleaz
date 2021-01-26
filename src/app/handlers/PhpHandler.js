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
		if (version && !this.terminal.process.runAndGet(`brew list --formula | grep "^php@${version}"; true`)) {
			throw new CustomError(`Version ${version} is not installed.`);
		}

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
	 * Get PHP Version.
	 *
	 * @returns {string} - Return PHP Version.
	 */
	get fullVersion() {
		return this.terminal
			.process
			.runAndGet(`${this.getBinaryPath(this.command.parameter('phpVersion'))} -v | awk '/^PHP/{print $2}'`);
	}

}


export default PhpHandler;
