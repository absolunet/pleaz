import { NotImplementedError } from '@absolunet/ioc';

/**
 * Handler Class.
 *
 * @memberof app.handlers
 * @abstract
 */
class Handler {

	/**
	 * Service Name.
	 *
	 * @returns {string} - The service name.
	 * @abstract
	 */
	get serviceName() {
		throw new NotImplementedError(this, 'serviceName');
	}

	/**
	 * Start Services.
	 *
	 * @returns {Promise<{message:string}>} The async process promise.
	 * @abstract
	 */
	start() {
		throw new NotImplementedError(this, 'start');
	}

	/**
	 * Stop Services.
	 *
	 * @returns {Promise<{message:string}>} The async process promise.
	 * @abstract
	 */
	stop() {
		throw new NotImplementedError(this, 'stop');
	}

	/**
	 * Restart Services.
	 *
	 * @returns {Promise<{message:string}>} The async process promise.
	 * @abstract
	 */
	restart() {
		throw new NotImplementedError(this, 'restart');
	}

	/**
	 * Get Status Services.
	 *
	 * @returns {Promise} The async process promise.
	 * @abstract
	 */
	status() {
		throw new NotImplementedError(this, 'status');
	}

	/**
	 * Get Service container name.
	 *
	 * @returns {string} - Return service name.
	 * @abstract
	 */
	getServiceCommand() {
		throw new NotImplementedError(this, 'getServiceCommand');
	}

	/**
	 * Spawn a process through the command instance.
	 *
	 * @param {string} command - The binary to call.
	 * @param {string|Array} [parameters = ''] - The given parameters.
	 * @param {boolean} [privileged = false] - Can be used to override the default class config.
	 * @returns {Promise} The async process promise.
	 * @protected
	 */
	spawn(command, parameters = '', privileged = false) {
		let spawnCommand = command;
		const spawnParameters = Array.isArray(parameters) ? parameters : parameters.trim().split(' ');

		if (this.privileged || privileged === true) {
			spawnCommand = 'sudo';
			spawnParameters.unshift(command);
		}

		return this.command.spawn(spawnCommand, spawnParameters);
	}

	/**
	 * Call a command through the command instance.
	 *
	 * @param {...*} parameters - The given parameters.
	 * @returns {Promise} The async process promise.
	 * @protected
	 */
	call(...parameters) {
		return this.command.call(...parameters);
	}

	/**
	 * Verify if the commands required privileged permissions (sudo).
	 *
	 * @returns {boolean} True if the handler should spawn commands as privileged.
	 * @protected
	 */
	get privileged() {
		return false;
	}

}

export default Handler;
