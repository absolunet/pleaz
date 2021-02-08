//--------------------------------------------------------
//-- Node IoC - Command - Start MailHOg Command
//--------------------------------------------------------

import MailHogCommand from './MailHogCommand';

/**
 * Start MailHog Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.MailHogCommand
 */
class MailHogStartCommand extends MailHogCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'mailhog:start';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Start MailHog server.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.mailhog.start();

		this.success(`MailHog has been started.`);
	}

}


export default MailHogStartCommand;
