import BaseHandler from './BaseHandler';

/**
 * Container Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BaseHandler
 */
class ContainerHandler extends BaseHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'container';
	}

	/**
	 * @inheritdoc
	 */
	async status() {
		await this.spawn('docker', 'ps');
	}

}

export default ContainerHandler;
