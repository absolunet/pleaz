//--------------------------------------------------------
//-- Node IoC - Test - Unit - HandlerTest
//--------------------------------------------------------
'use strict';

const Handler  = require('../../../dist/node/app/handlers/Handler');
const TestCase = require('../../TestCase');

/**
 * Unit Tests for Handler Class.
 */
class HandlerTest extends TestCase {

	beforeEach() {
		super.beforeEach();
		this.givenEmptySpies();
		this.givenFakeHandler();
	}

	// TESTS
	//--------------------------------------------------------
	async testSpawnCommandIsCalledWithExpectedArguments() {
		this.givenSpawnCommand('foo');
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('foo', '');

		this.givenSpawnCommand('foo', 'param1 param2');
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('foo', 'param1 param2');
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsWhenPrivileged() {
		this.givenPrivilegedSpawnCommand('foo', '');
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', 'foo ');

		this.givenPrivilegedSpawnCommand('foo', 'param1 param2');
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', 'foo param1 param2');
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsWhenHandlerIsPrivileged() {
		this.givenPrivilegedFakeHandler();
		this.givenSpawnCommand('foo');
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', 'foo ');

		this.givenSpawnCommand('foo', 'param1 param2', true);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', 'foo param1 param2');
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenEmptySpies() {
		this.spies = {
			handler: {}
		};
	}

	givenFakeHandler() {
		this.spies.handler.spawn = jest.fn();

		const self = this;

		this.fakeHandler = this.app.make(class extends Handler {

			get command() {
				return {
					spawn: (command, parameters) => {
						return self.spies.handler.spawn(command, parameters);
					}
				};
			}

		});
	}

	givenPrivilegedFakeHandler() {
		if (this.fakeHandler === undefined) {
			this.givenFakeHandler();
		}
		Object.defineProperty(this.fakeHandler, 'privileged', {
			get: () => {
				return true;
			}
		});
	}

	givenSpawnCommand(command, parameters, privileged = false) {
		this.spawnArguments = {
			command,
			parameters,
			privileged
		};
	}

	givenPrivilegedSpawnCommand(command, parameters) {
		this.givenSpawnCommand(command, parameters, true);
	}

	// WHEN METHODS
	//--------------------------------------------------------
	whenSpawning() {
		this.fakeHandler.spawn(this.spawnArguments.command, this.spawnArguments.parameters, this.spawnArguments.privileged);
	}

	// THEN METHODS
	//--------------------------------------------------------
	thenSpawnShouldHaveBeenCalledWith(command, parameters) {
		this.expect(this.spies.handler.spawn).toHaveBeenCalledWith(command, parameters);
	}

}


module.exports = HandlerTest;
