//--------------------------------------------------------
//-- Node IoC - Test - Unit - PhpSwitchCommandTest
//--------------------------------------------------------
'use strict';

const PhpSwitchCommand       = require('../../../../../dist/node/app/console/commands/php/PhpSwitchCommand');
const TestCase               = require('../../../../TestCase');
const createMockedPhpHandler = require('../../../mocks/createMockedPhpHandler');
const { YError }             = require('yargs/build/index.cjs');

const testData = {
	command: {
		name: 'php:switch',
		version: '7.4'
	}
};

class PhpSwitchCommandTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenMockedPhpHandler();
		this.givenMockedTerminal();
		this.givenCommand();
	}

	afterEach() {
		jest.clearAllMocks();
		super.afterEach();
	}

	async testSwitchCommandCallPhpHandlerSwitch() {
		await this.whenRunningCommand(testData.command.version);
		this.thenShouldHaveCalledPhpHandlerSwitch();
		this.thenShouldHaveOutputSuccessMessage();

	}

	async testThrowErrorIfPhpVersionIsEmpty() {
		await this.whenRunningCommand();
		this.thenShouldNotSwitchedPhpVersion();
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenMockedPhpHandler(config = {}) {
		this.mockedHandler = createMockedPhpHandler(config);

		this.app.bind('handler.php', this.mockedHandler);

	}

	givenMockedTerminal() {
		this.mockedTerminal = {
			success: jest.fn()
		};
	}

	givenCommand() {
		this.app.make('command').add(() => {
			return this.make(PhpSwitchCommand, {
				app: this.app,
				terminal: this.mockedTerminal
			});
		});
	}

	// WHEN METHODS
	//--------------------------------------------------------
	async whenRunningCommand(parameters = '') {
		await this.whenAttemptingAsync(async () => {
			await this.app.make('command.registrar')
				.resolve(`${testData.command.name} ${parameters}`.trim());
		});
	}


	// THEN METHODS
	//--------------------------------------------------------
	thenShouldNotSwitchedPhpVersion() {
		this.expect(this.error).toBeInstanceOf(YError);
	}

	thenShouldHaveCalledPhpHandlerSwitch() {
		this.expect(this.mockedHandler.switch).toHaveBeenCalledWith(testData.command.version);
	}

	thenShouldHaveOutputSuccessMessage() {
		this.expect(this.mockedTerminal.success).toHaveBeenCalledWith(this.mockedHandler.returnValues.switch.message);
	}

}


module.exports = PhpSwitchCommandTest;
