//--------------------------------------------------------
//-- Node IoC - Command - ProjectDoctorCommand
//--------------------------------------------------------

import fs from 'fs';
import { Command } from '@absolunet/ioc';
import __ from '@absolunet/private-registry';
import CustomError from '../../../exceptions/CustomError';

class ProjectDoctorCommand extends Command {
	/**
	 * @inheritDoc
 	 */
	get name() {
		return 'project:doctor';
	}

	/**
	 * @inheritDoc
	 */
	get parameters() {
		return [];
	}

	/**
	 * @inheritDoc
	 */
	get description() {
		return 'Analyzes your project and returns any error found.';
	}

	get subCommands() {
		return [
			'service:doctor nginx',
			'service:doctor docker',
		];
	}

	async handle() {
		await this.runSubcommands();
	}

	async runSubcommands() {
		for (let i = 0; i < this.subCommands.length; i++) {
			const subCommand = this.subCommands[i];
			this.info(`Running pleaz ${subCommand}`);
			await this.call(subCommand);
			this.info('\n');
		}
	}

	validateConfigDirectory() {
		if (!fs.existsSync('config/pleaz')) {
			throw new CustomError('Could not find config/pleaz directory');
		}
	}
}

export default ProjectDoctorCommand;
