//--------------------------------------------------------
//-- Node IoC - Command - Start PHP
//--------------------------------------------------------

import PhpCommand from './PhpCommand';

/**
 * PhpStartCommand.
 */
class PhpStartCommand extends PhpCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'php:start';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Start PHP server. (ex. 7.2, 7.3)';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		const version = this.parameter('phpVersion') || this.php.getCurrentVersion();
		await this.php.start(version);

		this.success(`php@${version} (${this.php.getFullVersion(version)}) has started.`);
	}

}


export default PhpStartCommand;
