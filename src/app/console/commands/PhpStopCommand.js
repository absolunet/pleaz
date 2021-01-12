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
		const version = this.parameter('phpVersion') || this.php.getCurrentVersion();
		await this.php.stop(version);

		this.success(`php@${version} (${this.php.getFullVersion(version)}) has stopped.`);
	}

}


export default PhpStopCommand;
