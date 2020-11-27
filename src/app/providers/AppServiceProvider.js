//--------------------------------------------------------
//-- Node IoC - Providers - Application Service Provider
//--------------------------------------------------------

import { ServiceProvider } from '@absolunet/ioc';


/**
 * Application service provider.
 *
 * @memberof app.providers
 * @augments ioc.foundation.ServiceProvider
 * @hideconstructor
 */
class AppServiceProvider extends ServiceProvider {

	/**
	 * @inheritdoc
	 */
	get name() {
		return 'Node IoC - Application';
	}

	/**
	 * Register any application services.
	 */
	register() {
		// You may register any service either as a binding or a singleton using
		// this.app.bind('service.name', concrete) or
		// this.app.singleton('service.name', concrete). However, you should not
		// use any service since some services may not be available yet.
	}

	/**
	 * Bootstrap any application services.
	 */
	boot() {
		// You may use services here to bootstrap them. You can get a service
		// instance using this.app.make('service.name').
	}

}

export default AppServiceProvider;
