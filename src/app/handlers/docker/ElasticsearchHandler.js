import BaseHandler from './BaseHandler';

/**
 * Elasticsearch Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.BaseHandler
 */
class ElasticsearchHandler extends BaseHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'elasticsearch';
	}

}


export default ElasticsearchHandler;
