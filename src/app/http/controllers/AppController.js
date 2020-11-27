//--------------------------------------------------------
//-- Node IoC - HTTP - Controllers - Application Controller
//--------------------------------------------------------

import Controller from './Controller';


/**
 * Application controller that handles API request for information.
 *
 * @memberof app.http.controllers
 * @augments app.http.controllers.Controller
 * @hideconstructor
 */
class AppController extends Controller {

	/**
	 * @inheritdoc
	 */
	static get dependencies() {
		return ['config'];
	}

	/**
	 * Show application basic information.
	 *
	 * @returns {response} JSON response.
	 */
	index() {
		const { name, locale } = this.config.get('app');

		return this.json({ name, locale });
	}

}


export default AppController;
