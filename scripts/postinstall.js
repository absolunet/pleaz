//--------------------------------------------------------
//-- post-install
//--------------------------------------------------------
'use strict';

const fs = require('fs');

//-- Ensure there is an .env
const ENV     = `${__dirname}/../.env`;
const EXAMPLE = `${__dirname}/../.env.example`;

fs.access(ENV, fs.constants.F_OK, (error) => {
	if (error) {
		fs.copyFileSync(EXAMPLE, ENV);
	}
});
