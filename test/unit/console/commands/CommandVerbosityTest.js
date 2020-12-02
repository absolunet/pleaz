//--------------------------------------------------------
//-- Node IoC - Test - Unit - CommandVerbosity
//--------------------------------------------------------
'use strict';

const { Command }        = require('@absolunet/ioc');
const AppServiceProvider = require('../../../../dist/node/app/providers/AppServiceProvider');
const TestCase           = require('../../../TestCase');


class CommandVerbosityTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenMockedTerminal();
		this.givenRegisteredAppServiceProvider();
		this.givenSpiedCommandRegistrar();
		this.givenEmptyParameters();
	}

	afterEach() {
		jest.clearAllMocks();
		super.afterEach();
	}

	async testSubCommandsAreNotVerboseByDefault() {
		this.givenSubCommand();
		this.givenCommandCallingSubCommand();
		await this.whenRunningCommand();
		this.thenShouldHaveRunCommand();
		this.thenShouldHaveRunSubCommand();
		this.thenShouldNotHavePrinted();
	}

	async testSubCommandsAreVerboseIfVerboseFlagIsPresent() {
		this.givenSubCommand();
		this.givenCommandCallingSubCommand();
		this.givenVerboseFlag();
		await this.whenRunningCommand();
		this.thenShouldHaveRunCommand();
		this.thenShouldHaveRunSubCommand();
		this.thenShouldHavePrintedExecutedSubCommand();
	}

	async testSubCommandsInSubCommandsAreVerboseIfFlagIsPresent() {
		this.givenOtherCommand();
		this.givenSubCommandCallingOtherCommand();
		this.givenCommandCallingSubCommand();
		this.givenVerboseFlag();
		await this.whenRunningCommand();
		this.thenShouldHaveRunCommand();
		this.thenShouldHaveRunSubCommand();
		this.thenShouldHaveRunOtherCommand();
		this.thenShouldHavePrintedExecutedSubCommand();
		this.thenShouldHavePrintedExecutedOtherCommand();
	}

	async testSpawnProcessesAreNotVerboseByDefault() {
		this.givenCommandSpawningProcess();
		await this.whenRunningCommand();
		this.thenShouldHaveRunCommand();
		this.thenShouldHaveSpawnProcess();
		this.thenShouldNotHavePrinted();
	}

	async testSpawnProcessesAreVerboseIfFlagIsPresent() {
		this.givenCommandSpawningProcess();
		this.givenVerboseFlag();
		await this.whenRunningCommand();
		this.thenShouldHaveRunCommand();
		this.thenShouldHaveSpawnProcess();
		this.thenShouldHavePrintedSpawnProcess();
	}

	givenMockedTerminal() {
		const spawnSpy      = jest.fn();
		this.mockedTerminal = {
			_spawnSpy: spawnSpy,
			print:     jest.fn(),
			spawn:     jest.fn(async () => {
				await new Promise(setTimeout);
				spawnSpy();
			})
		};
	}

	givenRegisteredAppServiceProvider() {
		this.app.register(AppServiceProvider);
	}

	givenSpiedCommandRegistrar() {
		this.commandRegistrarSpy = this.spyOn('command.registrar');
	}

	givenEmptyParameters() {
		this.parameters = [];
	}

	givenCommand(command) {
		this.make('command').add(() => {
			return this.make(command, {
				app:      this.app,
				terminal: this.mockedTerminal
			});
		});
	}

	givenCommandCallingSubCommand() {
		this.givenCommand(class extends Command {

			get name() {
				return 'command';
			}

			handle() {
				return this.call('sub:command');
			}

		});
	}

	givenSubCommand(callback) {
		const handle = callback || async function() {
			await new Promise(setTimeout);
		};

		this.givenCommand(class extends Command {

			get name() {
				return 'sub:command';
			}

			async handle() {
				await handle.call(this);
			}

		});
	}

	givenSubCommandCallingOtherCommand() {
		this.givenSubCommand(async function() {
			await this.call('other:command');
		});
	}

	givenOtherCommand() {
		this.givenCommand(class extends Command {

			get name() {
				return 'other:command';
			}

			async handle() {
				await new Promise(setTimeout);
			}

		});
	}

	givenCommandSpawningProcess() {
		this.givenCommand(class extends Command {

			get name() {
				return 'command';
			}

			async handle() {
				await this.spawn('whoami');
			}

		});
	}

	givenVerboseFlag() {
		this.parameters.push('-v');
	}

	async whenRunningCommand() {
		await this.app.make('command.registrar')
			.resolve(`command ${this.parameters.join(' ')}`.trim());
	}

	thenShouldHaveResolvedCommand(command) {
		this.expect(this.commandRegistrarSpy.resolve.mock.calls.filter(([parameter]) => {
			return parameter.split(' ')[0] === command;
		})).toHaveLength(1);
	}

	thenShouldHaveRunCommand() {
		this.thenShouldHaveResolvedCommand('command');
	}

	thenShouldHaveRunSubCommand() {
		this.thenShouldHaveResolvedCommand('sub:command');
	}

	thenShouldHaveRunOtherCommand() {
		this.thenShouldHaveResolvedCommand('other:command');
	}

	thenShouldHaveSpawnProcess() {
		this.thenShouldNotHaveThrown();
		this.expect(this.mockedTerminal.spawn.mock.calls.filter(([command]) => {
			return command === 'whoami';
		})).toHaveLength(1);
		this.expect(this.mockedTerminal._spawnSpy).toHaveBeenCalled();
	}

	thenShouldHavePrinted(expected) {
		this.expect(this.mockedTerminal.print.mock.calls.filter(([value]) => {
			return value === expected;
		})).toHaveLength(1);
	}

	thenShouldHavePrintedExecutedSubCommand() {
		this.thenShouldHavePrinted(`\n>> Running internal command\n>> sub:command\n`);
	}

	thenShouldHavePrintedExecutedOtherCommand() {
		this.thenShouldHavePrinted(`\n>> Running internal command\n>> other:command\n`);
	}

	thenShouldHavePrintedSpawnProcess() {
		this.thenShouldHavePrinted(`\n>> Running\n>> whoami\n`);
	}

	thenShouldNotHavePrinted() {
		this.expect(this.mockedTerminal.print).not.toHaveBeenCalled();
	}

}


module.exports = CommandVerbosityTest;
