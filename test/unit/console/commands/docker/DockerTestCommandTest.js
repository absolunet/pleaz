//--------------------------------------------------------
//-- Node IoC - Test - Unit - DockerTestCommandTest
//--------------------------------------------------------
'use strict';

const Handler           = require('../../../../../dist/node/app/handlers/Handler');
const DockerTestCommand = require('../../../../../dist/node/app/console/commands/docker/DockerTestCommand');
const TestCase          = require('../../../../TestCase');


class DockerTestCommandTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenEmptySpies();
		this.givenCommand();
	}

	async testValidateDockerComposeConfiguration() {
		this.givenFakeDockerHandler();
		await this.whenRunningTestCommand();
		this.thenShouldHaveValidateDockerComposeConfiguration();
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenCommand() {
		this.app.make('command.registrar').add(DockerTestCommand);
	}

	givenEmptySpies() {
		this.spies = {
			handlers: {}
		};
	}

	givenFakeDockerHandler() {
		this.spies.handlers.docker = {};
		this.spies.handlers.docker.test = jest.fn(async () =>  {
			await new Promise(setTimeout);

			return {};
		});

		const self = this;  // eslint-disable-line unicorn/no-this-assignment

		this.app.bind(`handler.docker`, class extends Handler {

			test() {
				return self.spies.handlers.docker.test();
			}

		});

	}

	// WHEN METHODS
	//--------------------------------------------------------
	async whenRunningTestCommand() {
		await this.whenAttemptingAsync(async () => {
			await this.app.make('command.registrar')
				.resolve('docker:test');
		});
	}


	// THEN METHODS
	//--------------------------------------------------------
	thenShouldHaveValidateDockerComposeConfiguration() {
		this.expect(this.spies.handlers.docker.test).toHaveBeenCalled();
	}

}


module.exports = DockerTestCommandTest;
