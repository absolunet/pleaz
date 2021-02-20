//--------------------------------------------------------
//-- Node IoC - Test - Unit - ServiceStartCommandTest
//--------------------------------------------------------
'use strict';

const TestCase = require('../../../../TestCase');


class ServiceStartCommandTest extends TestCase {

	testSomething() {
		this.expect(true).toBe(true);
	}

	// 2 test
	// On veut tester sans version et avec version
	// Mocker le handler

	testStartServiceThroughDedicatedHandler() {
		// thenShouldHaveStartedServiceThroughHandler
	}

	testStartServiceWithSpecificVersion() {
		// thenShouldHaveStartedServiceThroughHandler
	}

	testThrowErrorIfHandlerDoesNotExist() {
		// Test
	}


	whenRunningCommand() {
		// Test
	}

	thenShouldHaveStartedServiceThroughHandler() {
		// Test
	}

	thenGivenVersionShouldHaveBeenPassedToHandler() {
		// Test
	}

	// GIVEN METHODS
	//--------------------------------------------------------



	// WHEN METHODS
	//--------------------------------------------------------



	// THEN METHODS
	//--------------------------------------------------------


}




module.exports = ServiceStartCommandTest;
