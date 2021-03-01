//--------------------------------------------------------
//-- Node IoC - Test - Unit - PhpSwitchCommandTest
//--------------------------------------------------------
'use strict';

const Handler          = require('../../../../../dist/node/app/handlers/Handler');
const PhpSwitchCommand = require('../../../../../dist/node/app/console/commands/php/PhpSwitchCommand');
const TestCase         = require('../../../../TestCase');


class PhpSwitchCommandTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenMockedTerminal();
		this.givenEmptySpies();
		this.givenCommand();
	}

	afterEach() {
		jest.clearAllMocks();
		super.afterEach();
	}

	async testSwitchCurrentPhpVersionToAnotherPhpVersion() {
		this.givenFakePhpHandler();
		this.givenPhpVersionToSwitch('7.3');
		await this.whenRunningCommand();
		this.thenShouldHaveSwitchPhpVersion();
	}

	async testThrowErrorIfPhpVersionIsEmpty() {
		this.givenFakePhpHandler();
		this.givenEmptyPhpVersion();
		await this.whenRunningCommand();
		this.thenShouldNotSwitchedPhpVersion();
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenCommand() {
		this.app.make('command.registrar').add(PhpSwitchCommand);
	}

	givenEmptySpies() {
		this.spies = {
			handlers: {}
		};
	}

	givenFakePhpHandler() {
		this.spies.handlers.php = {};
		this.spies.handlers.php.switch = jest.fn(() =>  {
			return { message: this.mockedTerminal.success(`${this.constructor.name} success`) };
		});
		this.spies.handlers.php.getFullVersion = jest.fn(() =>  {
			return {};
		});

		const self = this;

		this.app.bind(`handler.php`, class extends Handler {

			getFullVersion(...parameters) {
				return self.spies.handlers.php.getFullVersion(...parameters);
			}

			switch(...parameters) {
				return self.spies.handlers.php.switch(...parameters);
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

	givenEmptyPhpVersion() {
		this.version = '';
	}

	givenPhpVersionToSwitch(version) {
		this.version = version;
	}

	// WHEN METHODS
	//--------------------------------------------------------
	async whenRunningCommand() {

		await this.whenAttemptingAsync(async () => {
			await this.app.make('command.registrar')
				.resolve(`php:switch ${this.version}`.trim());
		});
	}


	// THEN METHODS
	//--------------------------------------------------------
	thenShouldHaveSwitchPhpVersion() {
		this.expect(this.spies.handlers.php.switch).toHaveBeenCalled();
	}

	thenShouldNotSwitchedPhpVersion() {
		this.thenShouldHaveThrown();
	}

}


module.exports = PhpSwitchCommandTest;
