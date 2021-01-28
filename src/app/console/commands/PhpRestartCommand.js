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
		return 'Restart PHP server. (ex. 7.2, 7.3)';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		const version = this.parameter('phpVersion') || this.php.getCurrentVersion();
		await this.php.restart(version);

		this.success(`php@${version} (${this.php.getFullVersion(version)}) has restarted.`);
	}

}


export default PhpRestartCommand;
