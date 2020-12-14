//--------------------------------------------------------
//-- Node IoC - Test - Test Case
//--------------------------------------------------------
'use strict';

const { TestCase: BaseTestCase } = require('@absolunet/ioc');


class TestCase extends BaseTestCase {

	beforeEach() {
		super.beforeEach();
		this.givenNoResult();
		this.givenNoError();
	}

	mock(abstract, factory) {
		return this.app.singleton(abstract, factory);
	}

	spyOn(abstract) {
		const spy = {};
		const concrete = this.app.make(abstract);

		Object.entries(Object.getOwnPropertyDescriptors(concrete.constructor.prototype))
			.forEach(([name, { value, get }]) => {
				if (get || typeof value !== 'function' || (value && value.mock)) {
					return;
				}

				spy[name] = jest.spyOn(concrete, name);
			});

		return spy;
	}

	givenNoResult() {
		this.result = null;
	}

	givenNoError() {
		this.error = null;
	}

	thenResultShouldBe(expected) {
		this.thenShouldNotHaveThrown();
		this.expect(this.result).toBe(expected);
	}

	thenResultShouldEqual(expected) {
		this.thenShouldNotHaveThrown();
		this.expect(this.result).toStrictEqual(expected);
	}

	thenShouldNotHaveThrown() {
		this.expect(this.error).toBeNull();
	}

	thenShouldHaveThrown() {
		this.expect(this.error).toBeTruthy();
	}

	thenErrorShouldBe(expected) {
		this.expect(this.error).toBe(expected);
	}

}


module.exports = TestCase;
