//--------------------------------------------------------
//-- Node IoC - Command - MailHogCommand
//--------------------------------------------------------

import { Command } from '@absolunet/ioc';
import __ from '@absolunet/private-registry';

/**
 * MailHog Base command.
 *
 * @memberof app.console.commands
 * @augments ioc.console.Command
 * @abstract
 */
class MailHogCommand extends Command {

	/**
	 * @inheritdoc
	 */
	static get abstract() {
		return this === MailHogCommand;
	}

	/**
	 * Get MailHog Handler Instance.
	 *
	 * @type {app.handler.MailHogHandler}
	 */
	get mailhog() {
		if (!__(this).get('mailhog')) {
			__(this).set('mailhog', this.app.make('handler.mailhog', { command: this }));
		}

		return __(this).get('mailhog');
	}

}


export default MailHogCommand;
