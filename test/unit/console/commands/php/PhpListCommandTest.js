//--------------------------------------------------------
//-- Node IoC - Test - Unit - PhpListCommandTest
//--------------------------------------------------------
'use strict';

const Handler         = require('../../../../../dist/node/app/handlers/Handler');
const PhpListCommand = require('../../../../../dist/node/app/console/commands/php/PhpListCommand');
const TestCase       = require('../../../../TestCase');


class PhpListCommandTest extends TestCase {

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

	async testShoulListTheVersionsOfPhpInstalled() {
		this.givenFakePhpHandler();
		await this.whenRunningCommand();
		this.thenShouldListedAllPhpVersionInstalled();
	}

	// GIVEN METHODS
	givenCommand() {
		this.app.make('command.registrar').add(PhpListCommand);
	}

	givenEmptySpies() {
		this.spies = {
			handlers: {}
		};
	}

	givenFakePhpHandler() {
		this.spies.handlers.php = {};
		this.spies.handlers.php.list = jest.fn(() =>  {
			return [`${this.constructor.name} 7.3`, `${this.constructor.name} 7.4`];
		});

		const self = this;

		this.app.bind(`handler.php`, class extends Handler {

			list() {
				return self.spies.handlers.php.list();
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

	// WHEN METHODS
	//--------------------------------------------------------
	async whenRunningCommand() {

		await this.whenAttemptingAsync(async () => {
			await this.app.make('command.registrar')
				.resolve(`php:list`.trim());
		});
	}

	// THEN METHODS
	//--------------------------------------------------------
	thenShouldListedAllPhpVersionInstalled() {
		this.expect(this.spies.handlers.php.list).toHaveBeenCalled();
	}

}


module.exports = PhpListCommandTest;
