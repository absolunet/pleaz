//--------------------------------------------------------
//-- Node IoC - Test - Unit - ServiceStopCommandTest
//--------------------------------------------------------
'use strict';

const Handler               = require('../../../../../dist/node/app/handlers/Handler');
const ServiceStatusCommand  = require('../../../../../dist/node/app/console/commands/service/ServiceStatusCommand');
const TestCase              = require('../../../../TestCase');


class ServiceStatusCommandTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenMockedTerminal();
		this.givenEmptySpies();
		this.givenCommand();
	}

	async testGetStatusOfSpecificService() {
		this.givenFakeServiceHandler('foo');
		await this.whenRunningCommandForService('foo');
		this.thenShouldGetStatusOfTheServiceThroughHandler('foo');
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenCommand() {
		this.app.make('command.registrar').add(ServiceStatusCommand);
	}

	givenEmptySpies() {
		this.spies = {
			handlers: {}
		};
	}

	givenFakeServiceHandler(service) {
		this.spies.handlers[service] = {};
		this.spies.handlers[service].status = jest.fn(() =>  {
			return { message: this.mockedTerminal.success(`${this.constructor.name} success`) };
		});

		const self = this;

		this.app.bind(`handler.${service}`, class extends Handler {

			status(...parameters) {
				return self.spies.handlers[service].status(...parameters);
			}

		});
	}

	givenMockedTerminal() {
		this.mockedTerminal = {
			success: jest.fn()
		};
	}

	// WHEN METHODS
	//--------------------------------------------------------
	async whenRunningCommandForService(service) {
		await this.whenAttemptingAsync(async () => {
			await this.app.make('command.registrar')
				.resolve(`service:status ${service}`);
		});
	}


	// THEN METHODS
	//--------------------------------------------------------
	thenShouldGetStatusOfTheServiceThroughHandler(service) {
		this.expect(this.spies.handlers[service].status).toHaveBeenCalled();
	}

}


module.exports = ServiceStatusCommandTest;
