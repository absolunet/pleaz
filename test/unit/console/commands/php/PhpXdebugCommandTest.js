//--------------------------------------------------------
//-- Node IoC - Test - Unit - PhpXdebugCommandTest
//--------------------------------------------------------
'use strict';

const PhpXdebugCommand       = require('../../../../../dist/node/app/console/commands/php/PhpXdebugCommand');
const createMockedPhpHandler = require('../../../mocks/createMockedPhpHandler');
const TestCase               = require('../../../../TestCase');

const testData = {
	command: {
		name: 'php:xdebug'
	}
};

class PhpXdebugCommandTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenMockedTerminal();
		this.givenMockedCommandCall();
		this.givenMockedPhpHandler();
		this.givenCommand();
	}

	afterEach() {
		jest.clearAllMocks();
		super.afterEach();
	}

	async testXdebugCommandShowsStatusByDefault() {
		await this.whenRunningCommand();
		this.thenShouldHaveOutputSuccessMessages('Xdebug is disabled.');
	}

	// status
	//--------------------------
	async testXDebugCommandStatusWhenIsEnabled() {
		this.givenMockedPhpHandler({ isXdebugEnable: true });
		await this.whenRunningCommand('status');
		this.thenShouldHaveOutputSuccessMessages('Xdebug is enabled.');
	}

	async testXDebugCommandStatusWhenIsDisabled() {
		await this.whenRunningCommand('status');
		this.thenShouldHaveOutputSuccessMessages('Xdebug is disabled.');
	}

	// toggle: enable/disable
	//--------------------------
	async testXdebugEnableCommandCallsPhpHandlerToggleXdebug() {
		await this.whenRunningCommand('enable');
		this.thenShouldHaveCalledPhpHandlerToggleXdebug(true);
		this.thenShouldHaveOutputSuccessMessages(this.mockedHandler.returnValues.toggleXdebug.message);
	}

	async testXdebugDisableCommandCallsPhpHandlerToggleXdebug() {
		await this.whenRunningCommand('disable');
		this.thenShouldHaveCalledPhpHandlerToggleXdebug(false);
		this.thenShouldHaveOutputSuccessMessages(this.mockedHandler.returnValues.toggleXdebug.message);
	}


	async testXdebugToggleShowsWarningMessage() {
		this.givenMockedPhpHandler({
			toggleXdebug: {
				hasWarning: true
			}
		});
		await this.whenRunningCommand('enable');
		this.thenShouldHaveOutputWarningMessages(this.mockedHandler.returnValues.toggleXdebug.message);
	}

	// restart false && isRunning = false
	async testXdebugToggleIsNotRestartingServiceWhenIsNotRunningAndNotRequired() {
		await this.whenRunningCommand('enable');
		this.thenShouldNotHaveCalledCommand();
	}

	// restart false && isRunning = true
	async testXdebugToggleIsNotRestartingServiceWhenIsRunningAndNotRequired() {
		this.givenMockedPhpHandler({
			isServiceRunning: true
		});
		await this.whenRunningCommand('enable');
		this.thenShouldNotHaveCalledCommand();
	}

	// restart true && isRunning = false
	async testXdebugToggleIsNotRestartingServiceWhenIsNotRunningAndRequired() {
		this.givenMockedPhpHandler({
			toggleXdebug: {
				restart: true
			}
		});
		await this.whenRunningCommand('enable');
		this.thenShouldNotHaveCalledCommand();
	}

	// restart true && isRunning = true
	async testXdebugToggleIsNotRestartingServiceWhenIsRunningAndRequired() {
		this.givenMockedPhpHandler({
			isServiceRunning: true,
			toggleXdebug: {
				restart: true
			}
		});
		await this.whenRunningCommand('enable');
		this.thenShouldHaveCalledCommand('service:restart php getCurrentVersion');
	}


	// GIVEN METHODS
	//--------------------------------------------------------
	givenMockedTerminal() {
		this.mockedTerminal = {
			success: jest.fn(),
			warning: jest.fn()
		};
	}

	givenMockedCommandCall() {
		this.mockedCommandCall = jest.fn();
	}

	givenCommand() {
		this.app.make('command').add(() => {
			return this.make(PhpXdebugCommand, {
				app: this.app,
				terminal: this.mockedTerminal,
				call: this.mockedCommandCall
			});
		});
	}

	givenMockedPhpHandler(config = {}) {
		this.mockedHandler = createMockedPhpHandler(config);

		this.app.bind('handler.php', this.mockedHandler);
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
	thenShouldHaveCalledPhpHandlerToggleXdebug(state) {
		this.expect(this.mockedHandler.toggleXdebug).toHaveBeenCalledWith(state);
	}

	thenShouldHaveOutputSuccessMessages(...messages) {
		messages.forEach((message, index) => {
			this.expect(this.mockedTerminal.success).toHaveBeenNthCalledWith(index + 1, message);
		});
	}

	thenShouldHaveOutputWarningMessages(...messages) {
		messages.forEach((message, index) => {
			this.expect(this.mockedTerminal.warning).toHaveBeenNthCalledWith(index + 1, message);
		});
	}

	thenShouldHaveCalledCommand(command) {
		this.expect(this.mockedCommandCall).toHaveBeenCalledWith(command);
	}

	thenShouldNotHaveCalledCommand() {
		this.expect(this.mockedCommandCall).not.toHaveBeenCalled();
	}

}

module.exports = PhpXdebugCommandTest;
