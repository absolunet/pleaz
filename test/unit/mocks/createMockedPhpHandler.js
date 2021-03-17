'use strict';

const deepmerge = require('deepmerge');

/* eslint-disable quote-props */
const mockedReturnValues = {
	getCurrentVersion: 'getCurrentVersion',
	isServiceRunning: false,
	isXdebugEnable: false,
	list: ['v1'],
	restart: {
		message: 'restart'
	},
	switch: {
		message: 'switch'
	},
	toggleXdebug: {
		hasWarning: false,
		restart: false,
		message: 'toggleXdebug'
	}
};
/* eslint-enable quote-props */

const createMockedPhpHandler = (config) => {
	const returnValues = deepmerge(mockedReturnValues, config);

	const mockFn = (name) => {
		return jest.fn(() => {
			return returnValues[name];
		});
	};

	/* eslint-disable quote-props */
	const mockedHandler = {
		returnValues,
		getCurrentVersion: mockFn('getCurrentVersion'),
		isServiceRunning:  mockFn('isServiceRunning'),
		isXdebugEnable:    mockFn('isXdebugEnable'),
		list:			   mockFn('list'),
		restart: 		   mockFn('restart'),
		switch:			   mockFn('switch'),
		toggleXdebug: 	   mockFn('toggleXdebug')
	};
	/* eslint-enable quote-props */

	return mockedHandler;
};

module.exports = createMockedPhpHandler;
