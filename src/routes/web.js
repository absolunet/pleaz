//--------------------------------------------------------
//-- Node IoC - Web routes
//--------------------------------------------------------


export default (router, app) => {

	// Here, you may register all your web routes.
	// You can register any routes you want, bind them to
	// a callback or a registered controller with the
	// 'ControllerName@method' pattern, name them with the method .name(),
	// provide them some static values, anything you want.
	//
	// Let's build a nice website!

	router.get('/',        'HomeController@index').name('home');
	router.get('/example', 'HomeController@example').name('example');


	// Here, you can choose the static assets path.
	// The "/static" path can be changed whenever you want.
	// It will point to the configured public path,
	// which is by default in "[app root]/resources/static".

	router.static('/static',  app.publicPath());


	// Here, you can choose the publicly available uploaded files path.
	// The "/upload" path can be changed whenever you want.
	// It will point to the configured public uploads path,
	// which is by default in "[app root]/storage/uploads/public".

	router.static('/uploads', app.uploadPath('public'));

};
