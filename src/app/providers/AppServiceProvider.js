//--------------------------------------------------------
//-- Node IoC - Providers - Application Service Provider
//--------------------------------------------------------

import __                           from '@absolunet/private-registry';
import { ServiceProvider, Command } from '@absolunet/ioc';
import NginxHandler                 from '../handlers/NginxHandler';
import PhpHandler                   from '../handlers/PhpHandler';
import DockerHandler                from '../handlers/DockerHandler';
import MailHogHandler               from '../handlers/MailHogHandler';

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
		const VERBOSIFIED = 'verbosified';

		if (!__(Command).get(VERBOSIFIED)) {
			__(Command).set(VERBOSIFIED, true);
			const { spawn, call } = Command.prototype;
			const logCommand      = function(prefix, command) {
				this.log(`\n>> ${prefix}\n>> ${command.trim()}\n`);
			};

			Command.prototype.spawn = function(command, parameters = '', ...rest) {
				const stringParameters = Array.isArray(parameters) ? parameters.join(' ') : parameters;
				logCommand.call(this, 'Running', `${command} ${stringParameters}`.trim());

				return spawn.call(this, command, parameters, ...rest);
			};

			Command.prototype.call = function(command, ...rest) {
				logCommand.call(this, 'Running internal command', command);

				return call.call(this, `${command} ${this.verbose ? `-${'v'.repeat(this.verbose)}` : ''}`.trimEnd(), ...rest);
			};
		}

		this.registerConsoleHandlers();
	}

	/**
	 * Bootstrap any application services.
	 */
	boot() {
		// You may use services here to bootstrap them. You can get a service
		// instance using this.app.make('service.name').
	}

	/**
	 * Register Console Handlers.
	 */
	registerConsoleHandlers() {
		this.app.bind('handler.nginx', NginxHandler);
		this.app.bind('handler.php', PhpHandler);
		this.app.bind('handler.docker', DockerHandler);
		this.app.bind('handler.mailhog', MailHogHandler);
	}

}

export default AppServiceProvider;
