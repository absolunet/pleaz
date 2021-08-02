//--------------------------------------------------------
//-- Node IoC - Test - Unit - Project Handler Test
//--------------------------------------------------------
'use strict';

const ProjectHandler  = require('../../../../dist/node/app/handlers/project/ProjectHandler');
const HandlerTestCase = require('../../../HandlerTestCase');


class ProjectHandlerTest extends HandlerTestCase {

	beforeEach() {
		super.beforeEach();
		this.givenFakePath();
		this.givenFakeCommand();
		this.givenProjectHandler();

	}

	// TESTS
	//--------------------------------------------------------
	async testSetupMethodIsCalledThroughDedicatedHandler() {
		const output = await this.whenCallMethod('setup');

		this.thenExpectSpawnToHaveCalledWithArguments('ln', [
			'-sfn',
			'undefined/domain.mock',
			'/usr/local/etc/nginx/servers/'
		]);

		this.thenExpectSpawnToHaveCalledWithArguments('ln', [
			'-sfn',
			'/private/tmp/dockerComposeDirectoryMocked/',
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

	givenFakePath() {
		this.fakePath = {
			resolve: jest.fn()
		};
	}

	givenProjectHandler() {

		Object.defineProperty(ProjectHandler.prototype, 'cwd', {
			configurable: true,

			get() {
				return '/private/tmp/dockerComposeDirectoryMocked';
			}
		});

		Object.defineProperty(ProjectHandler.prototype, 'dockerComposeDirectory', {
			configurable: true,

			get() {
				return '/private/tmp/dockerComposeDirectoryMocked';
			}
		});

		this.fakeHandler = this.app.make(ProjectHandler, {
			app:      this.app,
			command:  this.fakeCommand,
			path:     this.fakePath,
			getDomainNamesListFromDirectory:  jest.fn(() => {
				return ['domain.mock'];
			}),
			changeCurrentDirectory:  jest.fn()
		});
	}

}


module.exports = ProjectHandlerTest;
