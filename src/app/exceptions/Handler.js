//--------------------------------------------------------
//-- Node IoC - Exceptions - Handler
//--------------------------------------------------------

import { ExceptionHandler } from '@absolunet/ioc';
import CustomError          from './CustomError';


/**
 * Application exception handler.
 *
 * @memberof app.exceptions
 * @augments ioc.foundation.exceptions.BaseHandler
 * @hideconstructor
 */
class Handler extends ExceptionHandler {

	/**
	 * Report an exception through the logger.
	 *
	 * @inheritdoc
	 */
	async report(exception) {
		await super.report(exception);
	}

	/**
	 * Render an exception through an HTTP response.
	 *
	 * @inheritdoc
	 */
	async renderResponse(exception, request, response) {
		await super.renderResponse(exception, request, response);
	}

	/**
	 * Render an exception through a console message.
	 *
	 * @inheritdoc
	 */
	async renderConsole(exception) {
		if (exception instanceof CustomError && this.app.environment.includes('production')) {
			delete exception.stack;
		}

		await super.renderConsole(exception);
	}

}


export default Handler;
