//--------------------------------------------------------
//-- Node IoC - Test - Unit - ServiceDoctorCommandTest
//--------------------------------------------------------
'use strict';

const Handler = require('../../../../../dist/node/app/handlers/Handler');
const ServiceDoctorCommand = require('../../../../../dist/node/app/console/commands/service/ServiceDoctorCommand');
const TestCase = require('../../../../TestCase');


class ServiceDoctorCommandTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenMockedTerminal();
		this.givenEmptySpies();
		this.givenCommand();
		this.givenMockedExceptionHandler();
	}

	async testServiceDoctorThroughDedicatedHandler() {
		this.givenFakeServiceHandler('foo');
		await this.whenRunningCommandForService('foo');
		this.thenShouldHaveDoctoredServiceThroughHandler('foo');
	}

	async testThrowErrorIfHandlerDoesNotExist() {
		this.givenFakeServiceHandler('foo');
		await this.whenRunningCommandForService('bar');
		this.thenShouldNotHaveDoctoredServiceThroughHandler('foo');
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenCommand() {
		this.app.make('command.registrar').add(ServiceDoctorCommand);
	}

	givenEmptySpies() {
		this.spies = {
			handlers: {}
		};
	}

	givenFakeServiceHandler(service) {
		this.spies.handlers[service] = {};
		this.spies.handlers[service].doctor = jest.fn(() =>  {
			return { message: this.mockedTerminal.success(`${this.constructor.name} success`) };
		});

		const self = this;  // eslint-disable-line unicorn/no-this-assignment

		this.app.bind(`handler.${service}`, class extends Handler {

			doctor(...parameters) {
				return self.spies.handlers[service].doctor(...parameters);
			}

		});

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
				.resolve(`service:doctor ${service}`.trim());
		});
	}


	// THEN METHODS
	//--------------------------------------------------------
	thenShouldHaveDoctoredServiceThroughHandler(service) {
		this.expect(this.spies.handlers[service].doctor).toHaveBeenCalled();
	}

	thenShouldNotHaveDoctoredServiceThroughHandler(service) {
		this.expect(this.spies.handlers[service].doctor).not.toHaveBeenCalled();
		this.thenShouldHaveThrown();
	}

}


module.exports = ServiceDoctorCommandTest;
