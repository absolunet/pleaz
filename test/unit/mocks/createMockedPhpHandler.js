const deepmerge = require('deepmerge')
const __ 		= require('@absolunet/private-registry')

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
}

function createMockedPhpHandler(config) {
	const returnValues = deepmerge(mockedReturnValues, config);

	const mockFn = (name) => {
		return jest.fn(() => {
			return returnValues[name]
		})
	}

	const mockedHandler = {
		returnValues: 	   returnValues,
		getCurrentVersion: mockFn('getCurrentVersion'),
		isServiceRunning:  mockFn('isServiceRunning'),
		isXdebugEnable:    mockFn('isXdebugEnable'),
		list:			   mockFn('list'),
		restart: 		   mockFn('restart'),
		switch:			   mockFn('switch'),
		toggleXdebug: 	   mockFn('toggleXdebug')

	}

	return mockedHandler;
}

module.exports = createMockedPhpHandler;


