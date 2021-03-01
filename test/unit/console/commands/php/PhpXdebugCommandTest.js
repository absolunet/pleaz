//--------------------------------------------------------
//-- Node IoC - Test - Unit - PhpXdebugCommandTest
//--------------------------------------------------------
'use strict';

const Handler          = require('../../../../../dist/node/app/handlers/Handler');
const PhpXdebugCommand = require('../../../../../dist/node/app/console/commands/php/PhpXdebugCommand');
const TestCase         = require('../../../../TestCase');


class PhpXdebugCommandTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenMockedTerminal();
		this.givenEmptySpies();
		this.givenCommand();
		this.givenCurrentVersion('7.3');
	}

	afterEach() {
		jest.clearAllMocks();
		super.afterEach();
	}

	async testEnableXdebug() {
		this.givenFakePhpHandler();
		this.givenXdebugStatus(false);
		this.givenIsServiceRunning(true);
		await this.whenRunningCommand('enable');
		this.thenShouldHaveEnabledXdebug();
	}

	async testDisableXdebug() {
		this.givenFakePhpHandler();
		this.givenXdebugStatus(true);
		this.givenIsServiceRunning(true);
		await this.whenRunningCommand('disable');
		this.thenShouldHaveDisabledXdebug();
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenCommand() {
		this.app.make('command.registrar').add(PhpXdebugCommand);
	}

	givenEmptySpies() {
		this.spies = {
			handlers: {}
		};
	}

	givenFakePhpHandler() {
		this.spies.handlers.php = {};
		this.spies.handlers.php.isXdebugEnable = jest.fn(() =>  {
			return this.isXdebugEnable;
		});
		this.spies.handlers.php.toggleXdebug = jest.fn(() =>  {
			return { message: this.mockedTerminal.success(`${this.constructor.name} toggleXdebug success`) };
		});
		this.spies.handlers.php.getCurrentVersion = jest.fn(() =>  {
			return this.currentVersion;
		});
		this.spies.handlers.php.isServiceRunning = jest.fn(() =>  {
			return this.isServiceRunning;
		});
		this.spies.handlers.php.restart = jest.fn(() =>  {
			return { message: this.mockedTerminal.success(`${this.constructor.name} restart success`) };
		});

		const self = this;

		this.app.bind(`handler.php`, class extends Handler {

			restart() {
				return self.spies.handlers.php.restart();
			}

			isServiceRunning() {
				return self.spies.handlers.php.isServiceRunning();
			}

			getCurrentVersion() {
				return self.spies.handlers.php.getCurrentVersion();
			}

			isXdebugEnable() {
				return self.spies.handlers.php.isXdebugEnable();
			}

			toggleXdebug(...parameters) {
				return self.spies.handlers.php.toggleXdebug(...parameters);
			}

		});
	}

	givenMockedTerminal() {
		this.mockedTerminal = {
			success: jest.fn((message) => {
				return message;
			})
		};
	}

	givenXdebugStatus(status) {
		this.isXdebugEnable = status;
	}

	givenCurrentVersion(version) {
		this.currentVersion = version;
	}

	givenIsServiceRunning(isRunning) {
		this.isServiceRunning = isRunning;
	}


	// WHEN METHODS
	//--------------------------------------------------------
	async whenRunningCommand(action) {
		await this.whenAttemptingAsync(async () => {
			await this.app.make('command.registrar')
				.resolve(`php:xdebug ${action}`.trim());
		});
	}


	// THEN METHODS
	//--------------------------------------------------------
	thenShouldHaveEnabledXdebug() {
		this.expect(this.spies.handlers.php.toggleXdebug).toHaveBeenCalled();
	}

	thenShouldHaveDisabledXdebug() {
		this.expect(this.spies.handlers.php.toggleXdebug).toHaveBeenCalled();
	}

	thenShouldNotHaveEnabledXdebug() {
		// this.expect(this.spies.handlers.php.toggleXdebug).toBe('adsasddsa');
		this.expect(this.spies.handlers.php.toggleXdebug).toHaveBeenCalled();
	}

}


module.exports = PhpXdebugCommandTest;
