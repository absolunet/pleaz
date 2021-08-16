//--------------------------------------------------------
//-- Node IoC - Test - Unit - ProjectCreateSymlinksCommandTest
//--------------------------------------------------------
'use strict';

const Handler                       = require('../../../../../dist/node/app/handlers/Handler');
const ProjectCreateSymlinksCommand  = require('../../../../../dist/node/app/console/commands/project/ProjectCreateSymlinksCommand');
const TestCase                      = require('../../../../TestCase');


class ProjectCreateSymlinksCommandTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenEmptySpies();
		this.givenMockedTerminal();
		this.givenMockedCommandCall();
		this.givenCommand();
	}

	async testCreateSymlinksProjectThroughProjectHandler() {
		this.givenFakeProjectHandler();
		await this.whenRunningCommand('createSymlinks');
		this.thenShouldCreateSymlinksProjectThroughProjectHandler();

		this.thenShouldHaveCalledCommand('service:restart nginx');
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenCommand() {
		this.app.make('command').add(() => {
			return this.make(ProjectCreateSymlinksCommand, {
				app: this.app,
				terminal: this.mockedTerminal,
				call: this.mockedCommandCall
			});
		});
	}

	givenEmptySpies() {
		this.spies = {
			handlers: {}
		};
	}

	givenMockedTerminal() {
		this.mockedTerminal = {
			success: jest.fn()
		};
	}

	givenMockedCommandCall() {
		this.mockedCommandCall = jest.fn();
	}

	givenFakeProjectHandler() {
		this.spies.handlers.project = {};
		this.spies.handlers.project.createSymlinks = jest.fn(() =>  {
			return { message: this.mockedTerminal.success(`${this.constructor.name} success`) };
		});

		const self = this;  // eslint-disable-line unicorn/no-this-assignment

		this.app.bind(`handler.project`, class extends Handler {

			createSymlinks() {
				return self.spies.handlers.project.createSymlinks();
			}

		});

	}

	// WHEN METHODS
	//--------------------------------------------------------
	async whenRunningCommand() {
		await this.whenAttemptingAsync(async () => {
			await this.app.make('command.registrar')
				.resolve(`project:create-symlinks`);
		});
	}


	// THEN METHODS
	//--------------------------------------------------------
	thenShouldCreateSymlinksProjectThroughProjectHandler() {
		this.expect(this.spies.handlers.project.createSymlinks).toHaveBeenCalled();
	}

	thenShouldHaveCalledCommand(command) {
		this.expect(this.mockedCommandCall).toHaveBeenCalledWith(command);
	}

}


module.exports = ProjectCreateSymlinksCommandTest;
