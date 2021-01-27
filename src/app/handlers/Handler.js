/**
 * Handler Class.
 *
 * @memberof app.handlers
 */
class Handler {

	/**
	 * Spawn a process through the command instance.
	 *
	 * @param {string} command - The binary to call.
	 * @param {string} [parameters = ''] - The given parameters.
	 * @param {boolean} [privileged = false] - Can be used to override the default class config.
	 * @returns {Promise} The async process promise.
	 */
	spawn(command, parameters = '', privileged = false) {
		let spawnCommand = command;
		let spawnParameters = parameters.trim();

		if (this.privileged || privileged === true) {
			spawnCommand = 'sudo';
			spawnParameters = `${command} ${parameters.trim()}`;
		}

		return this.command.spawn(spawnCommand, spawnParameters);
	}

	/**
	 * Call a command through the command instance.
	 *
	 * @param {...*} parameters - The given parameters.
	 * @returns {Promise} The async process promise.
	 */
	call(...parameters) {
		return this.command.call(...parameters);
	}

	/**
	 * Verify if the commands required privileged permissions (sudo).
	 *
	 * @returns {boolean} True if the handler should spawn commands as privileged.
	 */
	get privileged() {
		return false;
	}

}

export default Handler;
