//--------------------------------------------------------
//-- post-install
//--------------------------------------------------------
'use strict';

const fs   = require('fs');
const path = require('path');

//-- Ensure there is an .env
const ENV     = path.join(__dirname, '..', '.env');
const EXAMPLE = path.join(__dirname, '..', '.env.example');

fs.promises.access(ENV, fs.constants.F_OK).catch(() => {
	return fs.promises.copyFile(EXAMPLE, ENV);
});
