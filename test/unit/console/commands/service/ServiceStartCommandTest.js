//--------------------------------------------------------
//-- Node IoC - Test - Unit - ServiceStartCommandTest
//--------------------------------------------------------
'use strict';

const Handler              = require('../../../../../dist/node/app/handlers/Handler');
const ServiceStartCommand  = require('../../../../../dist/node/app/console/commands/service/ServiceStartCommand');
const TestCase             = require('../../../../TestCase');


class ServiceStartCommandTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenMockedTerminal();
		this.givenEmptySpies();
		this.givenCommand();
		this.givenMockedExceptionHandler();
	}

	async testServiceStartWithoutSpecificVersionThroughDedicatedHandler() {
		this.givenFakeServiceHandler('foo');
		this.givenServiceEmptyVersion();
		await this.whenRunningCommandForService('foo');
		this.thenShouldHaveStartedServiceThroughHandler('foo');
	}

	async testServiceStartWithSpecificVersionThroughDedicatedHandler() {
		this.givenFakeServiceHandler('foo');
		this.givenServiceVersion('888');
		await this.whenRunningCommandForService('foo');
		this.thenShouldHaveStartedServiceThroughHandler('foo');
	}

	async testThrowErrorIfHandlerDoesNotExist() {
		this.givenFakeServiceHandler('foo');
		this.givenServiceEmptyVersion();
		await this.whenRunningCommandForService('bar');
		this.thenShouldNotHaveStartedServiceThroughHandler('foo');
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenCommand() {
		this.app.make('command.registrar').add(ServiceStartCommand);
	}

	givenEmptySpies() {
		this.spies = {
			handlers: {}
		};
	}

	givenFakeServiceHandler(service) {
		this.spies.handlers[service] = {};
		this.spies.handlers[service].start = jest.fn(() =>  {
			return { message: this.mockedTerminal.success(`${this.constructor.name} success`) };
		});

		const self = this;

		this.app.bind(`handler.${service}`, class extends Handler {

			start(...parameters) {
				return self.spies.handlers[service].start(...parameters);
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
				.resolve(`service:start ${service} ${this.version}`);
		});
	}


	// THEN METHODS
	//--------------------------------------------------------
	thenShouldHaveStartedServiceThroughHandler(service) {
		this.expect(this.spies.handlers[service].start).toHaveBeenCalled();
	}

	thenShouldNotHaveStartedServiceThroughHandler(service) {
		this.expect(this.spies.handlers[service].start).not.toHaveBeenCalled();
		this.thenShouldHaveThrown();
	}

}


module.exports = ServiceStartCommandTest;
