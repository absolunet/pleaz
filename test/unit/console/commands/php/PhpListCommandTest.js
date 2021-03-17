//--------------------------------------------------------
//-- Node IoC - Test - Unit - PhpListCommandTest
//--------------------------------------------------------
'use strict';

const createMockedPhpHandler = require('../../../mocks/createMockedPhpHandler');
const TestCase               = require('../../../../TestCase');
const PhpListCommand         = require('../../../../../dist/node/app/console/commands/php/PhpListCommand');

const testData = {
	mockedCommand: {
		name: 'php:list'
	}
};

class PhpListCommandTest extends TestCase {

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

	async testShouldListMultipleVersionsReturnedByPhpHandler() {
		this.givenMockedPhpHandler({
			list: ['v1', 'v2', 'v3']
		});
		await this.whenRunningCommand();
		this.thenShouldHaveCalledPhpHandler();
		this.thenShouldListedAllPhpVersionInstalled();
	}

	async testShouldListVersionReturnedByPhpHandler() {
		await this.whenRunningCommand();
		this.thenShouldHaveCalledPhpHandler();
		this.thenShouldListedAllPhpVersionInstalled();
	}

	// GIVEN METHODS
	//-------------------------------------------------------
	givenMockedPhpHandler(config  = {}) {
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
			return this.make(PhpListCommand, {
				app: this.app,
				terminal: this.mockedTerminal
			});
		});
	}

	// WHEN METHODS
	//--------------------------------------------------------
	async whenRunningCommand() {

		await this.whenAttemptingAsync(async () => {
			await this.app.make('command.registrar')
				.resolve(testData.mockedCommand.name);
		});
	}

	// THEN METHODS
	//--------------------------------------------------------
	thenShouldHaveCalledPhpHandler() {
		this.expect(this.mockedHandler.list).toHaveBeenCalled();
	}

	thenShouldListedAllPhpVersionInstalled() {
		this.mockedHandler.returnValues.list.forEach((version, index) => {
			this.expect(this.mockedTerminal.success).toHaveBeenNthCalledWith(index + 1, `${version}.`);
		});
	}

}

module.exports = PhpListCommandTest;
