//--------------------------------------------------------
//-- Node IoC - Test - Unit - Container Handler Test
//--------------------------------------------------------
'use strict';

const ContainerHandler = require('../../../../dist/node/app/handlers/docker/ContainerHandler');
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
	async testGetRunningContainersListShouldCallSpawnWithDockerPs() {
		await this.whenCallMethod('status');
		this.thenExpectSpawnToHaveCalledWithArguments('docker', ['ps']);
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenBaseHandler() {
		Object.defineProperty(ContainerHandler.prototype, 'serviceName', {
			configurable: true,

			get() {
				return 'docker';
			}
		});

		this.fakeHandler = this.app.make(ContainerHandler, { command: this.fakeCommand });
	}

}


module.exports = BaseHandlerTest;
