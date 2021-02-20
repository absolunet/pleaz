import DockerHandler from './DockerHandler';

/**
 * Varnish Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.DockerHandler
 */
class VarnishHandler extends DockerHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'varnish';
	}

}


export default VarnishHandler;
