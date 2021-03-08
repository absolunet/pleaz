//--------------------------------------------------------
//-- Node IoC - Test - Unit - Php Handler Test
//--------------------------------------------------------
'use strict';

const PhpHandler      = require('../../../../dist/node/app/handlers/brew/PhpHandler');
const HandlerTestCase = require('../../../HandlerTestCase');


class PhpHandlerTest extends HandlerTestCase {

	beforeEach() {
		super.beforeEach();
		this.givenEmptySpies();
		this.givenMockedTerminal();
		this.givenFakeCommand();
		this.givenBaseHandler();
	}


	// TESTS
	//--------------------------------------------------------
	testGetBinaryPathMethodIsCalledWithVersion() {
		this.givenParameters('7.3');

		this.whenCallMethodWithParameters('getBinaryPath', this.parameters);

		this.thenExpectRunAndGetToHaveBeenCalledTimes(2);
		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			`brew list --formula | grep "^php@${this.parameters}"; true`,
			`brew --prefix php@${this.parameters}`
		]);
	}

	testGetBinaryPathMethodIsCalledWithoutVersion() {
		this.whenCallMethod('getBinaryPath');

		this.thenExpectRunAndGetToHaveBeenCalledTimes(3);
		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			'php -r \'echo PHP_MAJOR_VERSION . "." . PHP_MINOR_VERSION;\'',
			'brew list --formula | grep "^php@php -r \'echo PHP_MAJOR_VERSION . "." . PHP_MINOR_VERSION;\'"; true',
			'brew --prefix php@php -r \'echo PHP_MAJOR_VERSION . "." . PHP_MINOR_VERSION;\''
		]);
	}

	testGetFullVersionMethodIsCalledWithVersion() {
		this.givenParameters('7.3');

		this.whenCallMethodWithParameters('getFullVersion', this.parameters);

		this.thenExpectRunAndGetToHaveBeenCalledTimes(3);
		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			`brew list --formula | grep "^php@${this.parameters}"; true`,
			`brew --prefix php@${this.parameters}`,
			`brew --prefix php@${this.parameters}/sbin/php-fpm -v | awk '/^PHP/{print $2}'`
		]);

		this.thenShouldNotHaveThrown();
	}

	testGetFullVersionMethodIsCalledWithoutVersion() {
		this.whenCallMethod('getFullVersion');

		this.thenExpectRunAndGetToHaveBeenCalledTimes(4);
		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			'php -r \'echo PHP_MAJOR_VERSION . "." . PHP_MINOR_VERSION;\'',
			'brew list --formula | grep "^php@php -r \'echo PHP_MAJOR_VERSION . "." . PHP_MINOR_VERSION;\'"; true',
			'brew --prefix php@php -r \'echo PHP_MAJOR_VERSION . "." . PHP_MINOR_VERSION;\''
		]);

		this.thenShouldNotHaveThrown();
	}

	testGetInstalledVersionsMethodIsCalled() {
		this.whenCallMethod('getInstalledVersions');

		this.thenExpectRunAndGetToHaveBeenCalledTimes(1);
		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			'brew list --formula | grep "^php@"; true'
		]);

		this.thenShouldNotHaveThrown();
	}

	testEnsureVersionExistsMethodIsCalledWithVersion() {
		this.givenParameters('7.3');

		this.whenCallMethodWithParameters('ensureVersionExists', this.parameters);

		this.thenExpectRunAndGetToHaveBeenCalledTimes(1);
		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			`brew list --formula | grep "^php@${this.parameters}"; true`
		]);

		this.thenShouldNotHaveThrown();
	}

	testGetCurrentVersionMethodIsCalled() {
		this.whenCallMethod('getCurrentVersion');

		this.thenExpectRunAndGetToHaveBeenCalledTimes(1);
		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			'php -r \'echo PHP_MAJOR_VERSION . "." . PHP_MINOR_VERSION;\''
		]);

		this.thenShouldNotHaveThrown();
	}

	async testToggleXdebugMethodIsCalledWithBooleanParameters() {
		await this.whenCallMethodWithParameters('toggleXdebug', false);

		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'mv',
			'php --ini | grep Scan | cut -d" " -f7/ext-xdebug.ini',
			'php --ini | grep Scan | cut -d" " -f7/ext-xdebug.ini.dis'
		]);

		this.thenExpectRunAndGetToHaveBeenCalledTimes(2);
		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			'php -m | grep xdebug; true',
			'php --ini | grep Scan | cut -d" " -f7'
		]);
	}

	async testIsDebugEnableMethodIsCalled() {
		await this.whenCallMethod('isXdebugEnable');

		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			'php -m | grep xdebug; true'
		]);
	}

	async testIsServiceRunningMethodIsCalledWithVersion() {
		this.givenParameters('7.3');

		await this.whenCallMethodWithParameters('isServiceRunning', this.parameters);

		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			`sudo brew services list | grep php@${this.parameters} | awk '{print $2}'`
		]);
	}

	async testIsServiceRunningMethodIsCalledWithoutVersion() {
		await this.whenCallMethod('isServiceRunning');

		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			`sudo brew services list | grep php@undefined | awk '{print $2}'`
		]);
	}

	async testGetIniFilesPathMethodIsCalled() {
		await this.whenCallMethod('getIniFilesPath');

		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			'php --ini | grep Scan | cut -d" " -f7'
		]);
	}

	async testStartMethodIsCalledWithVersion() {
		this.givenParameters('7.3');

		const output = await this.whenCallMethodWithParameters('start', this.parameters);

		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'brew', 'services', 'start', `php@${this.parameters}`
		]);
		this.thenShouldReturn(
			output,
			{
				message: `php@${this.parameters}  (brew --prefix php@${this.parameters}/sbin/php-fpm -v | awk '/^PHP/{print $2}') is started.`
			}
		);
	}

	async testStartMethodIsCalledWithoutParameters() {
		const getCurrentVersionCommand = 'php -r \'echo PHP_MAJOR_VERSION . "." . PHP_MINOR_VERSION;\'';
		const output = await this.whenCallMethodWithParameters('start');

		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			getCurrentVersionCommand
		]);
		this.thenShouldReturn(
			output,
			{
				message: `php@${getCurrentVersionCommand}  (brew --prefix php@${getCurrentVersionCommand}/sbin/php-fpm -v | awk '/^PHP/{print $2}') is started.`
			}
		);
	}

	async testStopMethodIsCalledWithVersion() {
		this.givenParameters('7.3');

		const output = await this.whenCallMethodWithParameters('stop', this.parameters);

		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'brew', 'services', 'stop', `php@${this.parameters}`
		]);
		this.thenShouldReturn(
			output,
			{
				message: `php@${this.parameters}  (brew --prefix php@${this.parameters}/sbin/php-fpm -v | awk '/^PHP/{print $2}') is stopped.`
			}
		);
	}

	async testStopMethodIsCalledWithoutParameters() {
		const getCurrentVersionCommand = 'php -r \'echo PHP_MAJOR_VERSION . "." . PHP_MINOR_VERSION;\'';
		const output = await this.whenCallMethodWithParameters('stop');

		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			getCurrentVersionCommand
		]);
		this.thenShouldReturn(
			output,
			{
				message: `php@${getCurrentVersionCommand}  (brew --prefix php@${getCurrentVersionCommand}/sbin/php-fpm -v | awk '/^PHP/{print $2}') is stopped.`
			}
		);
	}

	async testRestartMethodIsCalledWithParameters() {
		this.givenParameters('7.3');

		const output = await this.whenCallMethodWithParameters('restart', this.parameters);

		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'brew', 'services', 'restart', `php@${this.parameters}`
		]);
		this.thenShouldReturn(
			output,
			{
				message: `php@${this.parameters}  (brew --prefix php@${this.parameters}/sbin/php-fpm -v | awk '/^PHP/{print $2}') is restarted.`
			}
		);
	}

	async testRestartMethodIsCalledWithoutParameters() {
		const getCurrentVersionCommand = 'php -r \'echo PHP_MAJOR_VERSION . "." . PHP_MINOR_VERSION;\'';
		const output = await this.whenCallMethodWithParameters('restart');

		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			getCurrentVersionCommand
		]);
		this.thenShouldReturn(
			output,
			{
				message: `php@${getCurrentVersionCommand}  (brew --prefix php@${getCurrentVersionCommand}/sbin/php-fpm -v | awk '/^PHP/{print $2}') is restarted.`
			}
		);
	}

	async testStatusMethodIsCalledWithParameters() {
		this.givenParameters('7.3');
		await this.whenCallMethodWithParameters('status', this.parameters);
		this.thenExpectTerminalRunAndGetToHaveBeenNthCalledWith([
			`brew list --formula | grep "^php@${this.parameters}"; true`
		]);
		this.thenExpectSpawnToHaveCalledWithArguments('sudo', [
			'bash', '-c', `brew services list | sed -e '1p' -e '/php@${this.parameters} /!d'`
		]);

	}

	// GIVEN METHODS
	//--------------------------------------------------------
	givenParameters(parameters) {
		this.parameters = parameters;
	}

	givenBaseHandler() {
		this.fakeHandler = this.app.make(PhpHandler, {
			app:      this.app,
			terminal: this.mockedTerminal,
			command:  this.fakeCommand
		});
	}

	givenMockedTerminal() {
		this.mockedTerminal = {
			process: {
				runAndGet: jest.fn((message) => {
					return message;
				})
			}
		};
	}

	// WHEN METHODS
	//--------------------------------------------------------
	whenCallGetFullVersionMethodWithVersion(version) {
		return this.fakeHandler.getFullVersion(version);
	}

	// THEN METHODS
	//--------------------------------------------------------
	thenExpectRunAndGetToHaveCalledWithArguments(output, outputToBe = '<runAndGet>') {
		this.expect(output).toBe(outputToBe);
	}

	thenExpectRunAndGetToHaveBeenCalledTimes(expectedTimes) {
		this.expect(this.mockedTerminal.process.runAndGet).toHaveBeenCalledTimes(expectedTimes);
	}

}


module.exports = PhpHandlerTest;
