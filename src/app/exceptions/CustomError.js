/**
 * Custom Exception Errors for PLEAZ application.
 *
 * @memberof app.exceptions
 * @augments Error
 *
 */
class CustomError extends Error {

	/**
	 * @inheritdoc
	 */
	constructor(message) {
		super(message);
		this.name = 'CustomError';
	}

}


export default CustomError;
