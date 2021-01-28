//--------------------------------------------------------
//-- Node IoC - Command - List PHP
//--------------------------------------------------------

import PhpCommand from './PhpCommand';

/**
 * PhpListCommand.
 */
class PhpListCommand extends PhpCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'php:list';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'List all versions of PHP installed.';
	}

	/**
	 * @inheritdoc
	 */
	handle() {
		this.php.list().forEach((version) => {
			this.success(`${version}.`);
		});
	}

}


export default PhpListCommand;
