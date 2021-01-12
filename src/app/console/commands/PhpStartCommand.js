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
		return 'Start PHP server.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.php.start(this.parameter('phpVersion'));

		this.success(`php-fpm@${this.php.fullVersion} has started.`);
	}

}


export default PhpStartCommand;
