//--------------------------------------------------------
//-- Node IoC - Test - Unit - Project Handler Test
//--------------------------------------------------------
'use strict';

const ProjectHandler  = require('../../../../dist/node/app/handlers/project/ProjectHandler');
const HandlerTestCase = require('../../../HandlerTestCase');


class ProjectHandlerTest extends HandlerTestCase {

	beforeEach() {
		super.beforeEach();
		this.givenSpiedProcess();
		this.givenFakePath();
		this.givenFakeCommand();
		this.givenProjectHandler();
	}

	// TESTS
	//--------------------------------------------------------
	async testCreateSymlinksMethodIsCalledThroughProjectHandler() {
		this.givenCurrentWorkingDirectory('/directoryMocked/config/pleaz/macos');

		const output = await this.whenCallMethod('createSymlinks');

		this.thenExpectSpawnToHaveCalledWithArguments('ln', [
			'-sfn',
			'/directoryMocked/config/pleaz/macos/services/nginx/domain.mock',
			'/usr/local/etc/nginx/servers/'
		]);

		this.thenExpectSpawnToHaveCalledWithArguments('ln', [
			'-sfn',
			'/directoryMocked/',
			'/usr/local/var/www/domain.mock'
		]);

		this.thenShouldReturn(
			output,
			{
				message: `Symbolic links have been created.`
			}
		);

	}

	async testCreateSymlinksMethodIsCalledThroughProjectHandlerWithGoodCurrentDirectory() {
		this.givenCurrentWorkingDirectory('/directoryMocked/config/pleaz/macos');

		await this.whenAttemptingAsync(async () => {
			await this.whenCallMethod('createSymlinks');
		});

		this.thenShouldNotHaveThrown();
	}

	async testCreateSymlinksMethodIsCalledThroughProjectHandlerWithBadCurrentDirectory() {
		this.givenCurrentWorkingDirectory('/directoryMocked/very-bad-directory');

		await this.whenAttemptingAsync(async () => {
			await this.whenCallMethod('createSymlinks');
		});

		this.thenShouldHaveThrown();
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenFakePath() {
		this.fakePath = {
			resolve: jest.fn()
		};
	}

	givenSpiedProcess() {
		this.processSpy = jest.spyOn(process, 'cwd');
	}

	givenCurrentWorkingDirectory(value) {
		this.processSpy.mockReturnValue(value);
	}

	givenProjectHandler() {
		this.fakeHandler = this.app.make(ProjectHandler, {
			app:      this.app,
			command:  this.fakeCommand,
			path:     this.fakePath,
			getDomainNamesListFromDirectory:  jest.fn(() => {
				return ['domain.mock'];
			})
		});
	}

}


module.exports = ProjectHandlerTest;
