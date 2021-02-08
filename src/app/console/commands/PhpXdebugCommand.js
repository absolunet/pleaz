//--------------------------------------------------------
//-- Node IoC - Command - Enable / Disable / Status Xdebug
//--------------------------------------------------------

import PhpCommand  from './PhpCommand';
import CustomError from '../../exceptions/CustomError';

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
	 * Status Parameters.
	 *
	 * @returns {{enable: Function, disable: Function, status: Function}} - Status Parameters available.
	 */
	get STATUS() {
		return {
			enable: this.handleEnable,
			disable: this.handleDisable,
			status: this.handleStatus
		};
	}

	/**
	 * @inheritdoc
	 */
	get parameters() {
		return [
			['status', false, 'status', `Get Xdebug status or enable/disable. [${Object.keys(this.STATUS)}]`]
		];
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		const handler = this.getHandlerForStatus(this.parameter('status'));

		const { message } = await handler();

		this.success(message);

	}

	/**
	 * Handler for status.
	 *
	 * @param {string} status - Status Parameters.
	 * @returns {Promise} Promise<{message: string}> - The async process promise.
	 */
	getHandlerForStatus(status) {
		const handler = this.STATUS[status];

		if (!handler) {
			throw new CustomError(`Only [${Object.keys(this.STATUS)}] parameters are available.`);
		}

		return handler.bind(this);
	}

	/**
	 * Enable PHP Xdebug.
	 *
	 * @returns {Promise} Promise<{{message:string}}> - The async process promise.
	 */
	async handleEnable() {
		await this.php.toggleXdebug(true);

		return {
			message: 'Xdebug has been enabled.'
		};
	}

	/**
	 * Disable PHP Xdebug.
	 *
	 * @returns {Promise} Promise<{{message:string}}> - The async process promise.
	 */
	async handleDisable() {
		await this.php.toggleXdebug(false);

		return {
			message: 'Xdebug has been disabled.'
		};
	}

	/**
	 * Get Status of PHP Xdebug.
	 *
	 * @returns {Promise} Promise<{{message:string}}> - The async process promise.
	 */
	async handleStatus() {

		return {
			message: await this.php.isXdebugEnable() ? 'Xdebug is enabled.' : 'Xdebug is disabled.'
		};
	}

}


export default PhpXdebugCommand;
