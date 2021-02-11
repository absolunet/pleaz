import DockerHandler from './DockerHandler';

/**
 * Elasticsearch Handler Class.
 *
 * @memberof app.handlers
 * @augments app.handlers.Handler
 */
class ElasticsearchHandler extends DockerHandler {

	/**
	 * @inheritdoc
	 */
	get service() {
		return 'elasticsearch';
	}

}


export default ElasticsearchHandler;
