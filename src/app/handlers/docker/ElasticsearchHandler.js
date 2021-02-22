import Handler from './Handler';

/**
 * Elasticsearch Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class ElasticsearchHandler extends Handler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'elasticsearch';
	}

}


export default ElasticsearchHandler;
