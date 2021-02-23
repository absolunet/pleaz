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
	async testSpawnCommandIsCalledWithoutExpectedArguments() {
		this.givenSpawnCommand('foo', []);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('foo', []);
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsAsString() {
		this.givenSpawnCommand('foo', 'param1 param2');
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('foo', ['param1', 'param2']);
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsAsArray() {
		this.givenSpawnCommand('foo', ['param1', 'param2']);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('foo', ['param1', 'param2']);
	}

	async testSpawnCommandIsCalledWithoutExpectedArgumentsWhenPrivileged() {
		this.givenPrivilegedSpawnCommand('foo', []);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', ['foo']);
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsWhenPrivilegedAsString() {
		this.givenPrivilegedSpawnCommand('foo', 'param1 param2');
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', ['foo', 'param1', 'param2']);
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsWhenPrivilegedAsArray() {
		this.givenPrivilegedSpawnCommand('foo', ['param1', 'param2']);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', ['foo', 'param1', 'param2']);
	}

	async testSpawnCommandIsCalledWithoutExpectedArgumentsWhenHandlerIsPrivileged() {
		this.givenPrivilegedFakeHandler();
		this.givenSpawnCommand('foo', []);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', ['foo']);
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsWhenHandlerIsPrivilegedAsString() {
		this.givenSpawnCommand('foo', 'param1 param2', true);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', ['foo', 'param1', 'param2']);
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsWhenHandlerIsPrivilegedAsArray() {
		this.givenSpawnCommand('foo', ['param1', 'param2'], true);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', ['foo', 'param1', 'param2']);
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
