//--------------------------------------------------------
//-- Node IoC - Command - Restart MailHog Command
//--------------------------------------------------------

import MailHogCommand from './MailHogCommand';

/**
 * Restart MailHog Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.MailHogCommand
 */
class MailHogRestartCommand extends MailHogCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'mailhog:restart';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Restart MailHog server.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.mailhog.restart();

		this.success(`MailHog has been restarted.`);
	}

}


export default MailHogRestartCommand;
