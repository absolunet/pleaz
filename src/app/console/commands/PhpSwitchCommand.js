//--------------------------------------------------------
//-- Node IoC - Command - Switch PHP
//--------------------------------------------------------

import PhpCommand from './PhpCommand';

/**
 * PhpSwitchCommand.
 */
class PhpSwitchCommand extends PhpCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'php:switch';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Switch current PHP version. (ex. 7.2, 7.3)';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		const version = this.parameter('phpVersion') || this.php.getCurrentVersion();
		this.php.ensureVersionExists(version);
		await this.php.switch(version);

		this.success(`php@${version} (${this.php.getFullVersion(version)}) has switched.`);
	}

}


export default PhpSwitchCommand;
