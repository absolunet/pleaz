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
	async handle() {
		this.php.ensureVersionExists(this.parameter('phpVersion'));
		await this.php.switch(this.parameter('phpVersion'));

		this.success(`php-fpm@${this.php.fullVersion()} has switched.`);
	}

}


export default PhpSwitchCommand;
