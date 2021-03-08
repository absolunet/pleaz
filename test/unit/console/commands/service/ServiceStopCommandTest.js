//--------------------------------------------------------
//-- Node IoC - Test - Unit - ServiceStopCommandTest
//--------------------------------------------------------
'use strict';

const Handler              = require('../../../../../dist/node/app/handlers/Handler');
const ServiceStopCommand   = require('../../../../../dist/node/app/console/commands/service/ServiceStopCommand');
const TestCase             = require('../../../../TestCase');


class ServiceStopCommandTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenMockedTerminal();
		this.givenEmptySpies();
		this.givenCommand();
		this.givenMockedExceptionHandler();
	}

	async testServiceStopWithoutSpecificVersionThroughDedicatedHandler() {
		this.givenFakeServiceHandler('foo');
		this.givenServiceEmptyVersion();
		await this.whenRunningCommandForService('foo');
		this.thenShouldHaveStoppedServiceThroughHandler('foo');
	}

	async testServiceStopWithSpecificVersionThroughDedicatedHandler() {
		this.givenFakeServiceHandler('foo');
		this.givenServiceVersion('888');
		await this.whenRunningCommandForService('foo');
		this.thenShouldHaveStoppedServiceThroughHandler('foo');
	}

	async testThrowErrorIfHandlerDoesNotExist() {
		this.givenFakeServiceHandler('foo');
		this.givenServiceEmptyVersion();
		await this.whenRunningCommandForService('bar');
		this.thenShouldNotHaveStoppedServiceThroughHandler('foo');
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenCommand() {
		this.app.make('command.registrar').add(ServiceStopCommand);
	}

	givenEmptySpies() {
		this.spies = {
			handlers: {}
		};
	}

	givenFakeServiceHandler(service) {
		this.spies.handlers[service] = {};
		this.spies.handlers[service].stop = jest.fn(() =>  {
			return { message: this.mockedTerminal.success(`${this.constructor.name} success`) };
		});

		const self = this;

		this.app.bind(`handler.${service}`, class extends Handler {

			stop(...parameters) {
				return self.spies.handlers[service].stop(...parameters);
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
			success: jest.fn()
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
				.resolve(`service:stop ${service} ${this.version}`.trim());
		});
	}


	// THEN METHODS
	//--------------------------------------------------------
	thenShouldHaveStoppedServiceThroughHandler(service) {
		this.expect(this.spies.handlers[service].stop).toHaveBeenCalled();
	}

	thenShouldNotHaveStoppedServiceThroughHandler(service) {
		this.expect(this.spies.handlers[service].stop).not.toHaveBeenCalled();
		this.thenShouldHaveThrown();
	}

}


module.exports = ServiceStopCommandTest;
