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
		await this.php.restart(this.parameter('phpVersion'));

		this.success(`php-fpm@${this.php.fullVersion()} has restarted.`);
	}

}


export default PhpRestartCommand;
