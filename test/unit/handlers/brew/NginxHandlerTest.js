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

	async testGetNginxMessages() {
		this.givenMockedTerminalAndCrossSpawn();
		this.givenMockedIsAbsolutePath();
		this.givenMockedIsDirectoryExists();

		const output = await this.whenCallMethod('getNginxMessages');

		this.expect(this.fakeHandler.command.terminal.crossSpawn.sync)
			.toHaveBeenCalledTimes(1);
		this.expect(output).toStrictEqual(['mock details']);
	}

	async testGetNginxMessagesWithFailingTest() {
		this.givenMockedTerminalAndCrossSpawn(true);
		this.givenMockedIsAbsolutePath();
		this.givenMockedIsDirectoryExists();

		const output = await this.whenCallMethod('getNginxMessages');

		this.expect(this.fakeHandler.command.terminal.crossSpawn.sync)
			.toHaveBeenCalledTimes(1);
		this.expect(output).toStrictEqual([
			'One or more errors occurred while testing NGINX' +
			'\n',
			'mock test failed'
		]);
	}

	// TESTS
	//--------------------------------------------------------
	async testGetSymlinksFromDirectory() {
		const output = await this.whenCallMethodWithParameters(
			'getSymlinksFromDirectory',
			'/mock/directory'
		);

		this.expect(this.fakeHandler.file.engine.readdir)
			.toHaveBeenCalledTimes(1);
		this.expect(this.fakeHandler.file.engine.lstat)
			.toHaveBeenCalledTimes(2);
		this.expect(this.fakeHandler.file.engine.readlink)
			.toHaveBeenCalledTimes(2);

		this.expect(output)
			.toStrictEqual([
				{
					symlink: '/mock/directory/symlink1',
					target: '/mock/directory/symlink1/target'
				},
				{
					symlink: '/mock/directory/symlink2',
					target: '/mock/directory/symlink2/target'
				}
			]);
	}

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

	async testRestartMethodIsCalledThroughDedicatedHandler() {
		const output = await this.whenCallMethod('restart');
		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'brew', 'services', 'restart', 'nginx'
		]);
		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'nginx', '-t'
		]);
		this.thenShouldReturn(output, { message: `${this.fakeHandler.serviceName} is restarted.` });
	}

	async testValidateDocumentRootSymlinks() {
		this.givenMockedGetSymlinksFromDirectory();
		this.givenMockedIsAbsolutePath();
		this.givenMockedIsDirectoryExists();

		const output = await this.whenCallMethod('validateDocumentRootSymlinks');

		this.expect(output)
			.toStrictEqual([
				'Found symlink "/mock/symlink1" with target path "/mock/symlink1/target"',
				'Found symlink "/mock/symlink2" with target path "/mock/symlink2/target"'
			]);

		this.thenExpectGetSymlinksFromDirectoryToHaveBeenCalledTimes();
	}

	async testValidateServerBlocks() {
		this.givenMockedGetSymlinksFromDirectory();
		this.givenMockedIsAbsolutePath();
		this.givenMockedIsDirectoryExists();

		const output = await this.whenCallMethod('validateServerBlocks');

		this.expect(output)
			.toStrictEqual([
				'Found symlink "/mock/symlink1" with target path "/mock/symlink1/target"',
				'Found symlink "/mock/symlink2" with target path "/mock/symlink2/target"'
			]);

		this.thenExpectGetSymlinksFromDirectoryToHaveBeenCalledTimes();
	}

	async testValidateSymlinksShouldReturnMessagesForSymlinks() {
		this.givenMockedIsAbsolutePath();
		this.givenMockedIsDirectoryExists();

		const output = await this.whenCallMethodWithParameters('validateSymlinks', [
			{
				symlink: '/mock/symlink1',
				target: '/mock/symlink1/target'
			},
			{
				symlink: '/mock/symlink2',
				target: '/mock/symlink2/target'
			}
		]);

		this.expect(output)
			.toStrictEqual([
				'Found symlink "/mock/symlink1" with target path "/mock/symlink1/target"',
				'Found symlink "/mock/symlink2" with target path "/mock/symlink2/target"'
			]);

		this.thenExpectIsPathAbsoluteToHaveBeenCalledTimes(2);
		this.thenExpectIsDirectoryExistsToHaveBeenCalledTimes(2);
	}

	async testValidateSymlinksShouldReturnAnErrorWhenTargetWithRelativePath() {
		this.givenMockedIsAbsolutePath(true);
		this.givenMockedIsDirectoryExists();

		const output = await this.whenCallMethodWithParameters('validateSymlinks', [
			{
				symlink: '/mock/symlink1/invalid',
				target: 'mock/symlink1/target'
			},
			{
				symlink: '/mock/symlink2/invalid',
				target: 'mock/symlink2/target'
			}
		], true);

		this.expect(output)
			.toStrictEqual([
				'Symlink "/mock/symlink1/invalid" should have an absolute path as a target. Current target: "mock/symlink1/target"',
				'Symlink "/mock/symlink2/invalid" should have an absolute path as a target. Current target: "mock/symlink2/target"'
			]);

		this.thenExpectIsPathAbsoluteToHaveBeenCalledTimes(2);
		this.thenExpectIsDirectoryExistsToHaveBeenCalledTimes(0);
	}

	async testValidateSymlinksShouldReturnAnErrorWhenNonExistingTargetDirectory() {
		this.givenMockedIsAbsolutePath();
		this.givenMockedIsDirectoryExists(true);

		const output = await this.whenCallMethodWithParameters('validateSymlinks', [
			{
				symlink: '/mock/symlink1/invalid',
				target: 'mock/symlink1/target'
			},
			{
				symlink: '/mock/symlink2/invalid',
				target: 'mock/symlink2/target'
			}
		], true);

		this.expect(output)
			.toStrictEqual([
				'Found symlink "/mock/symlink1/invalid" with target path "mock/symlink1/target", but target directory was not found',
				'Found symlink "/mock/symlink2/invalid" with target path "mock/symlink2/target", but target directory was not found'
			]);

		this.thenExpectIsPathAbsoluteToHaveBeenCalledTimes(2);
		this.thenExpectIsDirectoryExistsToHaveBeenCalledTimes(2);
	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenBaseHandler() {
		this.fakeHandler = this.app.make(NginxHandler, {
			command: this.fakeCommand,
			file: {
				engine: {
					exists: jest.fn().mockImplementation(() => {
						return true;
					}),
					lstat: jest.fn().mockImplementation(() => {
						return {
							isSymbolicLink: () => {
								return true;
							}
						};
					}),
					readdir: jest.fn().mockImplementation(() => {
						return [
							'symlink1',
							'symlink2'
						];
					}),
					readlink: jest.fn().mockImplementation((path) => {
						return `${path}/target`;
					})
				}
			}
		});
	}

	givenMockedIsAbsolutePath(shouldFail = false) {
		this.fakeHandler.isPathAbsolute = jest.fn().mockImplementation(() => {
			return !shouldFail;
		});
	}

	givenMockedIsDirectoryExists(shouldFail = false) {
		this.fakeHandler.isDirectoryExists = jest.fn().mockImplementation(() => {
			return !shouldFail;
		});
	}

	givenMockedFileEngineLstatWithSymbolicLinkCheckFail() {
		this.fakeHandler.file.engine.lstat = jest.fn().mockImplementation(() => {
			return {
				isSymbolicLink: () => {
					return false;
				}
			};
		});
	}

	givenMockedGetSymlinksFromDirectory() {
		this.fakeHandler.getSymlinksFromDirectory = jest.fn()
			.mockImplementation(() => {
				return [
					{
						symlink: '/mock/symlink1',
						target: '/mock/symlink1/target'
					},
					{
						symlink: '/mock/symlink2',
						target: '/mock/symlink2/target'
					}
				];
			});
	}

	givenMockedTerminalAndCrossSpawn(withFailingTest = false) {
		this.fakeHandler.command.terminal = {
			crossSpawn: {
				sync: jest.fn().mockImplementation(() => {
					return {
						stderr: withFailingTest ? 'mock test failed' : 'mock details'
					};
				})
			}
		};
	}

	// THEN METHODS
	//--------------------------------------------------------
	thenExpectIsDirectoryExistsToHaveBeenCalledTimes(times = 1) {
		this.expect(this.fakeHandler.isDirectoryExists)
			.toHaveBeenCalledTimes(times);
	}

	thenExpectGetSymlinksFromDirectoryToHaveBeenCalledTimes(times = 1) {
		this.expect(this.fakeHandler.getSymlinksFromDirectory)
			.toHaveBeenCalledTimes(times);
	}

	thenExpectIsPathAbsoluteToHaveBeenCalledTimes(times = 1) {
		this.expect(this.fakeHandler.isPathAbsolute)
			.toHaveBeenCalledTimes(times);
	}

}

module.exports = NginxHandlerTest;
