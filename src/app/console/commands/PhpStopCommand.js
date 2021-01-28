//--------------------------------------------------------
//-- Node IoC - Command - Stop PHP
//--------------------------------------------------------

import PhpCommand from './PhpCommand';

/**
 * PhpStopCommand.
 */
class PhpStopCommand extends PhpCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'php:stop';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Stop PHP server.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.php.stop(this.parameter('phpVersion'));

		this.success(`php-fpm@${this.php.getFullVersion()} has stopped.`);
	}

}


export default PhpStopCommand;
