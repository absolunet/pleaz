//--------------------------------------------------------
//-- Node IoC - Test - Unit - Nginx Handler Test
//--------------------------------------------------------
'use strict';

const NginxHandler    = require('../../../../dist/node/app/handlers/brew/NginxHandler');
const HandlerTestCase = require('../../../HandlerTestCase');


class NginxHandlerTest extends HandlerTestCase {

	beforeEach() {
		super.beforeEach();
		this.givenEmptySpies();
		this.givenFakeCommand();
		this.givenBaseHandler();
	}

	// TESTS
	//--------------------------------------------------------
	async testTestMethodIsCalledThroughDedicatedHandler() {
		await this.whenCallMethod('test');
		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'nginx', '-t'
		]);
	}

	async testStartMethodIsCalledThroughDedicatedHandler() {
		const output = await this.whenCallMethod('start');
		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'brew', 'services', 'start', 'nginx'
		]);
		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'nginx', '-t'
		]);
		this.thenShouldReturn(output, { message: `${this.fakeHandler.serviceName} is started.` });
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenBaseHandler() {
		this.fakeHandler = this.app.make(NginxHandler, { command: this.fakeCommand });
	}

}


module.exports = NginxHandlerTest;
