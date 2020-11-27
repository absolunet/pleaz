//--------------------------------------------------------
//-- Node IoC - API routes
//--------------------------------------------------------


export default (router) => {

	// All of the routes here will be prefixed by the uri '/api'.
	// All route names will also be prefixed by 'api.'.
	//
	// Let's build a nice API!

	router.get('/app', 'AppController@index').name('app.index');

};
