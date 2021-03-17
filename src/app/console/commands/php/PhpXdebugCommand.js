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
			enable: this.handleToggleXdebug.bind(this, true),
			disable: this.handleToggleXdebug.bind(this, false),
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
		const handler = this.getHandlerForParameters(this.parameter('parameters'));
		await handler();
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
			throw new CustomError(`Only [${Object.keys(this.PARAMETERS).join(', ')}] parameters are available.`);
		}

		return handler;
	}

	/**
	 * Toggle PHP Xdebug.
	 *
	 * @param {boolean} state - Which state to toggle (true -> enable).
	 * @returns {Promise} Promise<{{restart:bool, message:string}}> - The async process promise.
	 */
	async handleToggleXdebug(state = false) {
		const { hasWarning, message, restart } =  await this.php.toggleXdebug(state);
		this[hasWarning ? 'warning' : 'success'](message);

		const version = this.php.getCurrentVersion();
		const isServiceRunning = await this.php.isServiceRunning(version);

		if (restart && isServiceRunning) {
			await this.call(`service:restart php ${version}`);
		}

	}

	/**
	 * Get Status of PHP Xdebug.
	 */
	handleStatus() {
		const message = `Xdebug is ${this.php.isXdebugEnable() ? 'enabled' : 'disabled'}.`;

		this.success(message);
	}

}


export default PhpXdebugCommand;
