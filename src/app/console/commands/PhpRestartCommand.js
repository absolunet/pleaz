//--------------------------------------------------------
//-- Node IoC - Command - Restart PHP
//--------------------------------------------------------

import PhpCommand from './PhpCommand';

/**
 * PhpRestartCommand.
 */
class PhpRestartCommand extends PhpCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'php:restart';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Restart PHP server.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		const version = this.parameter('phpVersion') || this.php.getCurrentVersion();
		const { message } = await this.php.restart(version);

		this.success(message);
	}

}


export default PhpRestartCommand;
