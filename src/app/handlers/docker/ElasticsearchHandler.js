import DockerHandler from './DockerHandler';

/**
 * Elasticsearch Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.DockerHandler
 */
class ElasticsearchHandler extends DockerHandler {

	/**
	 * @inheritdoc
	 */
	get serviceName() {
		return 'elasticsearch';
	}

}


export default ElasticsearchHandler;
