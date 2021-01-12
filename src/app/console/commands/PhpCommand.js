//--------------------------------------------------------
//-- Node IoC - Command - PhpCommand
//--------------------------------------------------------

import { Command } from '@absolunet/ioc';

/**
 * PHP Base command.
 *
 * @memberof app.console.commands
 * @augments ioc.console.Command
 * @abstract
 */
class PhpCommand extends Command {

	/**
	 * @inheritdoc
	 */
	static get abstract() {
		return this === PhpCommand;
	}

	/**
	 * @inheritdoc
	 */
	get parameters() {
		return [
			['phpVersion', false, null, 'Specify a PHP Version.']
		];
	}

	/**
	 * Make a PHP Handler Instance.
	 *
	 * @returns {app.handler.PhpHandler} PhpHandler Instance.
	 */
	get php() {
		return this.app.make('handler.php', { command: this });
	}

}


export default PhpCommand;
