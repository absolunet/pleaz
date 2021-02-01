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
		return 'Enable and disable Xdebug.';
	}

	/**
	 * Status Parameters.
	 *
	 * @returns {{DISABLE: string, STATUS: string, ENABLE: string}} - Status Parameters available.
	 */
	get STATUS() {
		return {
			ENABLE: 'enable',
			DISABLE: 'disable',
			STATUS: 'status'
		};
	}

	/**
	 * @inheritdoc
	 */
	get parameters() {
		return [
			['status', true, null, 'Enable/Disable/Status Xdebug. [enable|disable|status]']
		];
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		const handler = this.getHandlerForStatus(this.parameter('status'));

		const { message, restart } = await handler();

		this.success(message);

		if (restart) {
			await this.php.restart();
		}
	}

	/**
	 * Handler for status.
	 *
	 * @param {string} status - Status Parameters.
	 * @returns {Promise} Promise<{message: string, restart: (bool|undefined)}> - The async process promise.
	 */
	getHandlerForStatus(status) {
		const handler = {
			[this.STATUS.ENABLE]:  this.handleEnable,
			[this.STATUS.DISABLE]: this.handleDisable,
			[this.STATUS.STATUS]: this.handleStatus
		}[status];

		if (!handler) {
			const parameters = Object.keys(this.STATUS).map((key) => {
				return this.STATUS[key];
			});

			throw new CustomError(`Only [${parameters}] parameters are available.`);
		}

		return handler.bind(this);
	}

	/**
	 * Enable PHP Xdebug.
	 *
	 * @returns {Promise} Promise<{message: string, restart: bool|undefined}> - The async process promise.
	 */
	async handleEnable() {
		await this.php.xdebugEnable();

		return {
			message: 'Xdebug has been enabled.',
			restart: true
		};
	}

	/**
	 * Disable PHP Xdebug.
	 *
	 * @returns {Promise} Promise<{message: string, restart: bool|undefined}> - The async process promise.
	 */
	async handleDisable() {
		await this.php.xdebugDisable();

		return {
			message: 'Xdebug has been disabled.',
			restart: true
		};
	}

	/**
	 * Get Status of PHP Xdebug.
	 *
	 * @returns {Promise} Promise<{message: string, restart: bool|undefined}> - The async process promise.
	 */
	async handleStatus() {

		return {
			message: await this.php.isXdebugEnable() ? 'Xdebug is enabled.' : 'Xdebug is disabled.',
			restart: false
		};
	}

}


export default PhpXdebugCommand;
