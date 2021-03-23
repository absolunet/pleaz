//--------------------------------------------------------
//-- Node IoC - Test - Unit - Base Handler Test
//--------------------------------------------------------
'use strict';

const BaseHandler     = require('../../../../dist/node/app/handlers/brew/BaseHandler');
const HandlerTestCase = require('../../../HandlerTestCase');


class BaseHandlerTest extends HandlerTestCase {

	beforeEach() {
		super.beforeEach();
		this.givenEmptySpies();
		this.givenFakeCommand();
		this.givenBaseHandler();
	}

	// TESTS
	//--------------------------------------------------------
	async testStartMethodIsCalledThroughBaseHandler() {
		const output = await this.whenCallMethod('start');
		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'brew', 'services', 'start', 'brew'
		]);
		this.thenShouldReturn(output, { message: `${this.fakeHandler.serviceName} is started.` });
	}

	async testStopMethodIsCalledThroughBaseHandler() {
		const output = await this.whenCallMethod('stop');
		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'brew', 'services', 'stop', 'brew'
		]);
		this.thenShouldReturn(output, { message: `${this.fakeHandler.serviceName} is stopped.` });
	}

	async testRestartMethodIsCalledThroughBaseHandler() {
		const output = await this.whenCallMethod('restart');
		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'brew', 'services', 'restart', 'brew'
		]);
		this.thenShouldReturn(output, { message: `${this.fakeHandler.serviceName} is restarted.` });
	}

	async testStatusMethodIsCalledThroughBaseHandler() {
		await this.whenCallMethod('status');
		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'bash', '-c', 'brew services list'
		]);
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenBaseHandler() {
		Object.defineProperty(BaseHandler.prototype, 'serviceName', {
			configurable: true,

			get() {
				return 'brew';
			}
		});

		this.fakeHandler = this.app.make(BaseHandler, { command: this.fakeCommand });
	}


}


module.exports = BaseHandlerTest;
