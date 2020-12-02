//--------------------------------------------------------
//-- Node IoC - Test - Handler Test Case
//--------------------------------------------------------
'use strict';

const TestCase = require('./TestCase');


class HandlerTestCase extends TestCase {

    // GIVEN METHODS
	//--------------------------------------------------------
	givenEmptySpies() {
		this.spies = {
			handler: {
				spawn: jest.fn()
			},
			terminal: {
				runAndGet: jest.fn()
			}
		};
		this.fakeHandler = {};
	}

	givenFakeCommand() {
		this.fakeCommand = {
			spawn: jest.fn()
		};
	}

	// WHEN METHODS
	//--------------------------------------------------------
	whenCallMethod(method) {
		return this.fakeHandler[method]();
	}

	whenCallMethodWithParameters(method, ...parameters) {
		return this.fakeHandler[method](...parameters);
	}


	// THEN METHODS
	//--------------------------------------------------------
	thenExpectSpawnToHaveCalledWithArguments(...output) {
		this.expect(this.fakeCommand.spawn).toHaveBeenCalledWith(...output);
		this.thenShouldNotHaveThrown();
	}

	thenShouldReturn(output, expectedOutput) {
		this.expect(output).toStrictEqual(expectedOutput);
	}

	thenExpectTerminalRunAndGetToHaveBeenNthCalledWith(outputLists) {
		outputLists.forEach((output, index) => {
			this.expect(this.mockedTerminal.process.runAndGet).toHaveBeenNthCalledWith(index + 1, output);
		});

	}

}


module.exports = HandlerTestCase;
