//--------------------------------------------------------
//-- Node IoC - Test - Unit - Base Handler Test
//--------------------------------------------------------
'use strict';

const BaseHandler = require('../../../../dist/node/app/handlers/docker/BaseHandler');
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
		this.thenExpectSpawnToHaveCalledWithArguments('docker-compose', [
			'up', '--detach', 'docker'
		]);
		this.thenShouldReturn(output, { message: `${this.fakeHandler.serviceName} is started.` });
	}

	async testStopMethodIsCalledThroughBaseHandler() {
		const output = await this.whenCallMethod('stop');
		this.thenExpectSpawnToHaveCalledWithArguments('docker-compose', [
			'rm', '--stop', '--force', '-v', 'docker'
		]);
		this.thenShouldReturn(output, { message: `${this.fakeHandler.serviceName} is stopped.` });
	}

	async testRestartMethodIsCalledThroughBaseHandler() {
		const output = await this.whenCallMethod('restart');
		this.thenExpectSpawnToHaveCalledWithArguments('docker-compose', [
			'restart', 'docker'
		]);
		this.thenShouldReturn(output, { message: `${this.fakeHandler.serviceName} is restarted.` });
	}

	async testStatusMethodIsCalledThroughBaseHandler() {
		await this.whenCallMethod('status');
		this.thenExpectSpawnToHaveCalledWithArguments('bash', [
			'-c', "docker-compose ps | sed -e '1p' -e '/docker/!d'"
		]);
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenBaseHandler() {
		Object.defineProperty(BaseHandler.prototype, 'serviceName', {
			configurable: true,

			get() {
				return 'docker';
			}
		});

		this.fakeHandler = this.app.make(BaseHandler, { command: this.fakeCommand });
	}

}


module.exports = BaseHandlerTest;
