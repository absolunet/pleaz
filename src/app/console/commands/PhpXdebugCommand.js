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
		const optionsParameters = ['enable', 'disable', 'status'];

		if (!optionsParameters.includes(this.parameter('status'))) {
			throw new CustomError(`Only '${optionsParameters}' parameters is available.`);
		}

		let message;
		let restartRequired = false;

		switch (this.parameter('status')) {

			case 'enable':
				await this.php.xdebugEnable();
				message = 'Xdebug has enabled';
				restartRequired = true;
				break;
			case 'disable':
				await this.php.xdebugDisable();
				message = 'Xdebug has disabled';
				restartRequired = true;
				break;
			case 'status':
				message = await this.php.isXdebugEnable() ? 'Xdebug is enabled.' : 'Xdebug is disabled.';
				break;
			default: break;

		}

		this.success(message);

		if (restartRequired) {
			await this.call('php:restart');
		}

	}

}


export default PhpXdebugCommand;
