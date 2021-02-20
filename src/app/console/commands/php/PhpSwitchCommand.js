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
		return 'Switch current PHP version.';
	}

	/**
	 * @inheritdoc
	 */
	get isPhpVersionRequired() {
		return true;
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		const version = this.parameter('serviceVersion');

		await this.php.switch(version);

		this.success(`php@${version} (${this.php.getFullVersion(version)}) has switched.`);
	}

}


export default PhpSwitchCommand;
