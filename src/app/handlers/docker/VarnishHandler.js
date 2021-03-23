import BaseHandler from './BaseHandler';

/**
 * Varnish Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BaseHandler
 */
class VarnishHandler extends BaseHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'varnish';
	}

}


export default VarnishHandler;
