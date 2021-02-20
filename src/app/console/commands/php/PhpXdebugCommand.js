//--------------------------------------------------------
//-- Node IoC - Command - Enable / Disable / Status Xdebug
//--------------------------------------------------------

import PhpCommand  from './PhpCommand';
import CustomError from '../../../exceptions/CustomError';

/**
 * PhpXdebugCommand.
 */
class PhpXdebugCommand extends PhpCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'php:xdebug';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Get Xdebug status or enable/disable.';
	}

	/**
	 * Parameters.
	 *
	 * @returns {{enable: Function, disable: Function, status: Function}} - Status Parameters available.
	 */
	get PARAMETERS() {
		return {
			enable: this.handleEnable.bind(this),
			disable: this.handleDisable.bind(this),
			status: this.handleStatus.bind(this)
		};
	}

	/**
	 * @inheritdoc
	 */
	get parameters() {
		return [
			['parameters', false, 'status', `Get Xdebug status or enable/disable. [${Object.keys(this.PARAMETERS).join(', ')}]`]
		];
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		try {
			const handler = this.getHandlerForParameters(this.parameter('parameters'));
			const { restart, message } = await handler();

			this.success(message);

			if (restart && await this.php.isServiceRunning(this.php.getCurrentVersion())) {
				const { message: restartMessage } = await this.php.restart(this.php.getCurrentVersion());

				this.success(restartMessage);
			}
		} catch (error) {
			this.warning(error.message);
		}

	}

	/**
	 * Handler for parameters.
	 *
	 * @param {string} parameters - Parameters.
	 * @returns {Promise} Promise<{message: string}> - The async process promise.
	 */
	getHandlerForParameters(parameters) {
		const handler = this.PARAMETERS[parameters];

		if (!handler) {
			throw new CustomError(`Only [${Object.keys(this.PARAMETERS)}] parameters are available.`);
		}

		return handler;
	}

	/**
	 * Enable PHP Xdebug.
	 *
	 * @returns {Promise} Promise<{{restart:bool, message:string}}> - The async process promise.
	 */
	async handleEnable() {
		await this.php.toggleXdebug(true);

		return {
			restart: true,
			message: 'Xdebug has been enabled.'
		};
	}

	/**
	 * Disable PHP Xdebug.
	 *
	 * @returns {Promise} Promise<{{restart:bool, message:string}}> - The async process promise.
	 */
	async handleDisable() {
		await this.php.toggleXdebug(false);

		return {
			restart: true,
			message: 'Xdebug has been disabled.'
		};
	}

	/**
	 * Get Status of PHP Xdebug.
	 *
	 * @returns {Promise} Promise<{{restart:bool, message:string}}> - The async process promise.
	 */
	async handleStatus() {

		return {
			restart: false,
			message: await this.php.isXdebugEnable() ? 'Xdebug is enabled.' : 'Xdebug is disabled.'
		};
	}

}


export default PhpXdebugCommand;
