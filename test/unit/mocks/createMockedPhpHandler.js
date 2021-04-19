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

	const mockFunction = (name) => {
		return jest.fn(() => {
			return returnValues[name];
		});
	};

	/* eslint-disable quote-props */
	const mockedHandler = {
		returnValues,
		getCurrentVersion: mockFunction('getCurrentVersion'),
		isServiceRunning:  mockFunction('isServiceRunning'),
		isXdebugEnable:    mockFunction('isXdebugEnable'),
		list:              mockFunction('list'),
		restart:           mockFunction('restart'),
		switch:            mockFunction('switch'),
		toggleXdebug:      mockFunction('toggleXdebug')
	};
	/* eslint-enable quote-props */

	return mockedHandler;
};

module.exports = createMockedPhpHandler;
