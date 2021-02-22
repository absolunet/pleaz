import Handler from './Handler';

/**
 * Varnish Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class VarnishHandler extends Handler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'varnish';
	}

}


export default VarnishHandler;
