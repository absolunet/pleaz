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
	testGetSpawnParametersShouldReturnCommandWithoutArguments() {
		const output = this.fakeHandler.getSpawnParameters('foo');
		this.thenExpectOutputToStrictEqual(output, {
			spawnCommand: 'foo',
			spawnParameters: ['']
		});
	}

	testGetSpawnParametersShouldReturnCommandWithArgumentsAsString() {
		const output = this.fakeHandler.getSpawnParameters('foo', 'param1 param2');
		this.thenExpectOutputToStrictEqual(output, {
			spawnCommand: 'foo',
			spawnParameters: ['param1', 'param2']
		});
	}

	testGetSpawnParametersShouldReturnCommandWithArgumentsAsArray() {
		const output = this.fakeHandler.getSpawnParameters('foo', ['param1', 'param2']);
		this.thenExpectOutputToStrictEqual(output, {
			spawnCommand: 'foo',
			spawnParameters: ['param1', 'param2']
		});
	}

	testGetSpawnParametersShouldReturnCommandWithoutArgumentsWhenPrivileged() {
		const output = this.fakeHandler.getSpawnParameters('foo', [], true);
		this.thenExpectOutputToStrictEqual(output, {
			spawnCommand: 'sudo',
			spawnParameters: ['foo']
		});
	}

	testGetSpawnParametersShouldReturnCommandWithArgumentsAsStringWhenPrivileged() {
		const output = this.fakeHandler.getSpawnParameters('foo', 'param1 param2', true);
		this.thenExpectOutputToStrictEqual(output, {
			spawnCommand: 'sudo',
			spawnParameters: ['foo', 'param1', 'param2']
		});
	}

	testGetSpawnParametersShouldReturnCommandWithArgumentsAsArrayWhenPrivileged() {
		const output = this.fakeHandler.getSpawnParameters('foo', ['param1', 'param2'], true);
		this.thenExpectOutputToStrictEqual(output, {
			spawnCommand: 'sudo',
			spawnParameters: ['foo', 'param1', 'param2']
		});
	}

	async testSpawnCommandIsCalledWithoutExpectedArguments() {
		this.givenSpawnCommand('foo', []);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('foo', []);
	}

	async testSpawnSyncCommandIsCalledWithoutExpectedArguments() {
		this.givenSpawnSyncCommand('foo', []);
		await this.whenSpawningSync();
		this.thenSpawnSyncShouldHaveBeenCalledWith('foo', []);
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsAsString() {
		this.givenSpawnCommand('foo', 'param1 param2');
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('foo', ['param1', 'param2']);
	}

	async testSpawnSyncCommandIsCalledWithExpectedArgumentsAsString() {
		this.givenSpawnSyncCommand('foo', 'param1 param2');
		await this.whenSpawningSync();
		this.thenSpawnSyncShouldHaveBeenCalledWith('foo', ['param1', 'param2']);
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsAsArray() {
		this.givenSpawnCommand('foo', ['param1', 'param2']);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('foo', ['param1', 'param2']);
	}

	async testSpawnSyncCommandIsCalledWithExpectedArgumentsAsArray() {
		this.givenSpawnSyncCommand('foo', ['param1', 'param2']);
		await this.whenSpawningSync();
		this.thenSpawnSyncShouldHaveBeenCalledWith('foo', ['param1', 'param2']);
	}

	async testSpawnCommandIsCalledWithoutExpectedArgumentsWhenPrivileged() {
		this.givenPrivilegedSpawnCommand('foo', []);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', ['foo']);
	}

	async testSpawnSyncCommandIsCalledWithoutExpectedArgumentsWhenPrivileged() {
		this.givenPrivilegedSpawnSyncCommand('foo', []);
		await this.whenSpawningSync();
		this.thenSpawnSyncShouldHaveBeenCalledWith('sudo', ['foo']);
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsWhenPrivilegedAsString() {
		this.givenPrivilegedSpawnCommand('foo', 'param1 param2');
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', ['foo', 'param1', 'param2']);
	}

	async testSpawnSyncCommandIsCalledWithExpectedArgumentsWhenPrivilegedAsString() {
		this.givenPrivilegedSpawnSyncCommand('foo', 'param1 param2');
		await this.whenSpawningSync();
		this.thenSpawnSyncShouldHaveBeenCalledWith('sudo', ['foo', 'param1', 'param2']);
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsWhenPrivilegedAsArray() {
		this.givenPrivilegedSpawnCommand('foo', ['param1', 'param2']);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', ['foo', 'param1', 'param2']);
	}

	async testSpawnSyncCommandIsCalledWithExpectedArgumentsWhenPrivilegedAsArray() {
		this.givenPrivilegedSpawnSyncCommand('foo', ['param1', 'param2']);
		await this.whenSpawningSync();
		this.thenSpawnSyncShouldHaveBeenCalledWith('sudo', ['foo', 'param1', 'param2']);
	}

	async testSpawnCommandIsCalledWithoutExpectedArgumentsWhenHandlerIsPrivileged() {
		this.givenPrivilegedFakeHandler();
		this.givenSpawnCommand('foo', []);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', ['foo']);
	}

	async testSpawnSyncCommandIsCalledWithoutExpectedArgumentsWhenHandlerIsPrivileged() {
		this.givenPrivilegedFakeHandler();
		this.givenSpawnCommand('foo', []);
		await this.whenSpawningSync();
		this.thenSpawnSyncShouldHaveBeenCalledWith('sudo', ['foo']);
	}

	async testSpawnCommandIsCalledWithExpectedArgumentsWhenHandlerIsPrivilegedAsString() {
		this.givenSpawnCommand('foo', 'param1 param2', true);
		await this.whenSpawning();
		this.thenSpawnShouldHaveBeenCalledWith('sudo', ['foo', 'param1', 'param2']);
	}

	async testSpawnSyncCommandIsCalledWithExpectedArgumentsWhenHandlerIsPrivilegedAsString() {
		this.givenSpawnSyncCommand('foo', 'param1 param2', true);
		await this.whenSpawningSync();
		this.thenSpawnSyncShouldHaveBeenCalledWith('sudo', ['foo', 'param1', 'param2']);
	}

	async testSpawnSyncCommandIsCalledWithExpectedArgumentsWhenHandlerIsPrivilegedAsArray() {
		this.givenSpawnSyncCommand('foo', ['param1', 'param2'], true);
		await this.whenSpawningSync();
		this.thenSpawnSyncShouldHaveBeenCalledWith('sudo', ['foo', 'param1', 'param2']);
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
		this.spies.handler.spawnSync = jest.fn();

		const self = this;  // eslint-disable-line unicorn/no-this-assignment

		this.fakeHandler = this.app.make(class extends Handler {

			get command() {
				return {
					spawn: (command, parameters) => {
						return self.spies.handler.spawn(command, parameters);
					},
					terminal: {
						crossSpawn: {
							sync: jest.fn()
						}
					}
				};
			}

			spawnSync(command, parameters, privileged) {
				const {
					spawnCommand,
					spawnParameters
				} = this.getSpawnParameters(command, parameters, privileged);

				return self.spies.handler.spawnSync(spawnCommand, spawnParameters);
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

	givenSpawnSyncCommand(command, parameters, privileged = false) {
		this.spawnSyncArguments = {
			command,
			parameters,
			privileged
		};
	}

	givenPrivilegedSpawnCommand(command, parameters) {
		this.givenSpawnCommand(command, parameters, true);
	}

	givenPrivilegedSpawnSyncCommand(command, parameters) {
		this.givenSpawnSyncCommand(command, parameters, true);
	}

	// WHEN METHODS
	//--------------------------------------------------------
	whenSpawning() {
		this.fakeHandler.spawn(this.spawnArguments.command, this.spawnArguments.parameters, this.spawnArguments.privileged);
	}

	whenSpawningSync() {
		this.fakeHandler.spawnSync(this.spawnSyncArguments.command, this.spawnSyncArguments.parameters, this.spawnSyncArguments.privileged);
	}

	// THEN METHODS
	//--------------------------------------------------------
	thenExpectOutputToStrictEqual(output, comparator) {
		this.expect(output).toStrictEqual(comparator);
	}

	thenSpawnShouldHaveBeenCalledWith(command, parameters) {
		this.expect(this.spies.handler.spawn).toHaveBeenCalledWith(command, parameters);
	}

	thenSpawnSyncShouldHaveBeenCalledWith(command, parameters) {
		this.expect(this.spies.handler.spawnSync).toHaveBeenCalledWith(command, parameters);
	}

}


module.exports = HandlerTest;
