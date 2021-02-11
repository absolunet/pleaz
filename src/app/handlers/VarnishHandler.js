import DockerHandler from './DockerHandler';

/**
 * Varnish Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class VarnishHandler extends DockerHandler {

	/**
	 * @inheritdoc
	 */
	get service() {
		return 'varnish';
	}

	/**
	 * @inheritdoc
	 */
	get privileged() {
		return false;
	}

}


export default VarnishHandler;
