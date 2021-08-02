//--------------------------------------------------------
//-- Node IoC - Test - Unit - Project Handler Test
//--------------------------------------------------------
'use strict';

const ProjectHandler  = require('../../../../dist/node/app/handlers/project/ProjectHandler');
const HandlerTestCase = require('../../../HandlerTestCase');


class ProjectHandlerTest extends HandlerTestCase {

	beforeEach() {
		super.beforeEach();
		this.givenFakeCommand();
		this.givenProjectHandler();

	}

	// TESTS
	//--------------------------------------------------------
	async testSetupMethodIsCalledThroughDedicatedHandler() {
		const output = await this.whenCallMethod('setup');

		this.thenExpectSpawnToHaveCalledWithArguments('ln', [
			'-sfn',
			'/private/tmp/config/pleaz/macos/services/nginx/domain.mock',
			'/usr/local/etc/nginx/servers/'
		]);

		this.thenExpectSpawnToHaveCalledWithArguments('ln', [
			'-sfn',
			'/private/tmp/',
			'/usr/local/var/www/domain.mock'
		]);

		this.thenShouldReturn(
			output,
			{
				message: `Symbolic links for server blocks have been created.`
			}
		);

	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenProjectHandler() {

		Object.defineProperty(ProjectHandler.prototype, 'webRoot', {
			configurable: true,

			get() {
				return '/private/tmp';
			}
		});

		Object.defineProperty(ProjectHandler.prototype, 'cwd', {
			configurable: true,

			get() {
				return '/private/tmp';
			}
		});

		this.fakeHandler = this.app.make(ProjectHandler, {
			app:      this.app,
			command:  this.fakeCommand,
			getDomainNamesListFromDirectory:  jest.fn(() => {
				return ['domain.mock'];
			})
		});
	}

}


module.exports = ProjectHandlerTest;
