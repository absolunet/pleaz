//--------------------------------------------------------
//-- Node IoC - Test - Unit - ServiceStartCommandTest
//--------------------------------------------------------
'use strict';

const Handler                = require('../../../../../dist/node/app/handlers/Handler');
const ServiceRestartCommand  = require('../../../../../dist/node/app/console/commands/service/ServiceRestartCommand');
const TestCase               = require('../../../../TestCase');


class ServiceRestartCommandTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenMockedTerminal();
		this.givenEmptySpies();
		this.givenCommand();
		this.givenMockedExceptionHandler();
	}

	afterEach() {
		jest.clearAllMocks();
		super.afterEach();
	}

	async testRestartServiceWithoutSpecificVersionThroughDedicatedHandler() {
		this.givenFakeServiceHandler('foo');
		this.givenServiceEmptyVersion();
		await this.whenRunningCommandForService('foo');
		this.thenShouldHaveRestartedServiceThroughHandler('foo');
	}

	async testRestartServiceWithSpecificVersionThroughDedicatedHandler() {
		this.givenFakeServiceHandler('foo');
		this.givenServiceVersion('888');
		await this.whenRunningCommandForService('foo');
		this.thenShouldHaveRestartedServiceThroughHandler('foo');
	}

	async testThrowErrorIfHandlerDoesNotExist() {
		this.givenFakeServiceHandler('foo');
		this.givenServiceEmptyVersion();
		await this.whenRunningCommandForService('bar');
		this.thenShouldNotHaveRestartedServiceThroughHandler();
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenCommand() {
		this.app.make('command.registrar').add(ServiceRestartCommand);
	}

	givenEmptySpies() {
		this.spies = {
			handlers: {}
		};
	}

	givenFakeServiceHandler(service) {
		this.spies.handlers[service] = {};
		this.spies.handlers[service].restart = jest.fn(() =>  {
			return { message: this.mockedTerminal.success(`${this.constructor.name} success`) };
		});

		const self = this;

		this.app.bind(`handler.${service}`, class extends Handler {

			restart(...parameters) {
				return self.spies.handlers[service].restart(...parameters);
			}

		});

	}

	givenServiceEmptyVersion() {
		this.version = '';
	}

	givenServiceVersion(version) {
		this.version = version;
	}

	givenMockedTerminal() {
		this.mockedTerminal = {
			success: jest.fn((message) => {
				return message;
			})
		};
	}

	givenMockedExceptionHandler() {
		this.app.bind('exception.handler', {
			handle: (error) => {
				this.error = error;
			}
		});
	}

	// WHEN METHODS
	//--------------------------------------------------------
	async whenRunningCommandForService(service) {
		await this.whenAttemptingAsync(async () => {
			await this.app.make('command.registrar')
				.resolve(`service:restart ${service} ${this.version}`.trim());
		});
	}


	// THEN METHODS
	//--------------------------------------------------------
	thenShouldHaveRestartedServiceThroughHandler(service) {
		this.expect(this.spies.handlers[service].restart).toHaveBeenCalled();
	}

	thenShouldNotHaveRestartedServiceThroughHandler() {
		this.thenShouldHaveThrown();
	}

}


module.exports = ServiceRestartCommandTest;
