//--------------------------------------------------------
//-- Node IoC - Command - Stop MailHog Command
//--------------------------------------------------------

import MailHogCommand from './MailHogCommand';

/**
 * Stop MailHog Command.
 *
 * @memberof app.console.commands
 * @augments app.console.commands.MailHogCommand
 */
class MailHogStopCommand extends MailHogCommand {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'mailhog:stop';
	}

	/**
	 * @inheritdoc
	 */
	get description() {
		return 'Stop MailHog server.';
	}

	/**
	 * @inheritdoc
	 */
	async handle() {
		await this.mailhog.stop();

		this.success(`MailHog has been stopped.`);
	}

}


export default MailHogStopCommand;
