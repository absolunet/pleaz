//--------------------------------------------------------
//-- Node IoC - Providers - Route Service Provider
//--------------------------------------------------------

import __                  from '@absolunet/private-registry';
import { ServiceProvider } from '@absolunet/ioc';


/**
 * Route service provider.
 *
 * @memberof app.providers
 * @augments ioc.foundation.ServiceProvider
 * @hideconstructor
 */
class RouteServiceProvider extends ServiceProvider {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'Node IoC - Route';
	}

	/**
	 * Boot the service provider.
	 */
	boot() {
		__(this).set('router', this.app.make('router'));
		this.map();
	}

	/**
	 * Map the application routes.
	 */
	map() {
		this.mapApiRoutes();
		this.mapWebRoutes();
	}

	/**
	 * Map web routes in the router.
	 */
	mapWebRoutes() {
		this.router.group({}, this.app.getModule(this.app.routesPath('web.js')));
	}

	/**
	 * Map web routes in the router.
	 */
	mapApiRoutes() {
		this.router.group({
			prefix: 'api',
			as: 'api.'
		}, this.app.getModule(this.app.routesPath('api.js')));
	}

	/**
	 * Application router.
	 *
	 * @type {Router}
	 */
	get router() {
		return __(this).get('router');
	}

}


export default RouteServiceProvider;
