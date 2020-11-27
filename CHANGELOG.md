# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).






## [Unreleased]



## [2.1.0] - 2020-11-24

### Added
 - MySQL database configuration
 - Database environment variables

### Changed
 - Updated framework to `2.1.0`



## [2.0.0] - 2020-05-29

### Added
 - Classes JSDoc

### Changed
 - Updated framework to `2.0.0`
 - Changed lifecycle error handler to catch new `ApplicationBootingError`



## [1.0.1] - 2020-03-05

### Added
 - `cache.enabled` configuration key, default to `true`
 - `commands` translation file with all default command translations in `en` and `fr`

### Changed
 - Updated framework to `1.0.1`
 - Updated `@absolunet/manager` (dev) to `2.1.0`
 - Updated `@absolunet/tester` (dev) to `3.2.2`
 - Updated `jest` (dev) to `25.1.0`



## [1.0.0-rc.2] - 2019-12-04

### Changed
 - Updated framework to `1.0.0-rc.2`



## [1.0.0-rc.1] - 2019-12-04

### Changed
 - Updated framework to `1.0.0-rc.1`
 - Bootstrap application for each test from test bootstrapper



## [1.0.0-beta.3] - 2019-11-21

### Added
 - Added service provider names

### Changed
 - Updated framework to `1.0.0-beta.3`
 - Changed default favicon

### Removed
 - Removed Ava from dependencies



## [1.0.0-beta.1] - 2019-11-05

### Added
 - Custom mixin systems for extensions within the bootstrapping system
 - `APP_DEBUG` environment variable support
 - `app.debug` configuration feed by `APP_DEBUG` environment variable
 - `dev.dumper.enabled` configuration feed by `APP_DEBUG` environment variable

### Changed
 - Updated framework to `1.0.0-beta.1`
 - Used application singleton instead of fresh instance



## [1.0.0-alpha.4] - 2019-11-01

### Added
 - `DatabaseSeeder` in the seeds folder, which is now run by default by `db:seed` command

### Changed
 - Updated framework to `1.0.0-alpha.4`



## [1.0.0-alpha.3] - 2019-10-30

### Added
 - Dumper disabled environments configuration

### Changed
 - Updated framework to `1.0.0-alpha.3`

### Fixed
 - Use correct path for databases storage



## [1.0.0-alpha.2] - 2019-10-29

### Changed
 - Updated framework to `1.0.0-alpha.2`
 - Simplify `AppController`



## [1.0.0-alpha.1] - 2019-10-26

### Added
 - Console kernel, extending the framework kernel, used by default in the bootstrapping
 - Exception handler, extending the framework exception handler, used by default in the bootstrapping
 - HTTP error page views
 - `storage/uploads` folder, with `public` subfolder
 - `/uploads` default static routes for content in `storage/uploads/public` folder
 - JSDoc API documentation
 - Security, support, contribution guidelines and code of conduct
 - GitHub templates
 - `dev.yaml` configuration file

### Changed
 - Updated framework to `1.0.0-alpha.1`
 - Convert to ECMAScript modules in favor of CommonJS
 - Main entry point is now located from `app/index.js` to `dist/node/index.js`
 - Moved `app` folder to `src/app`
 - Moved `bootstrap` folder to `src/bootstrap`
 - Moved `database` folder to `src/database`
 - Moved `routes` folder to `src/routes`
 - Moved databases from `database` folder to `storage/databases` folder
 - Bootstrapped application moved from the framework to the application repository
 - Database configured paths uses namespaces instead of absolute/relative paths
 - Test bootstrapper moved from `test/bootstrap.test.js` to `test/bootstrap/index.test.js`
 - Update `@absolunet/manager` to `2.0.0`
 - Update `@absolunet/tester` to `3.0.5`

### Fixed
 - Node.js version required to be `>=12.0.0`



## [0.9.0] - 2019-10-03

### Added
 - `http.yaml` configuration file
 - Base `TestCase` class that all test cases are inheriting from

### Changed
 - Updated framework to `0.9.0`
 - Updated class imports from framework without `classes` namespace



## [0.8.3] - 2019-09-17

### Changed
 - Updated framework to `0.8.3`

### Fixed
 - Change default log channel to `stack` instead of `single`



## [0.8.1] - 2019-09-16

### Added
 - Cache environment variables in the `.env.example` file
 - Logging limit environment variables in the `.env.example` file
 - `cache.yaml` configuration file, with `file` set as default store
 - `stack` logging channel with `single` channel in list
 - `storage/framework/cache/data` folder, with ignored content by Git
 - `resources/lang` folder with `translations.yaml` file containing default view translations

### Changed
 - Updated framework to `0.8.1`
 - Updated `ava` to `2.4.0`
 - Views use `t()` translation helper for text content



## [0.7.1] - 2019-09-09

### Added
 - `limit` and `level` thresholds configuration added to logging channels configuration
 - Explicit usage of `ava` package

### Changed
 - Updated framework to `0.7.1`
 - `file` logging channel renamed to `single`
 - Renamed `test/index.test.js` to `test/bootstrap.test.js`

### Removed
 - `ConsoleServiceProvider` in favor of kernel auto-registration



## [0.6.1] - 2019-08-21

### Added
 - Database and log environment variables in the `.env.example` file
 - `database.yaml`, `events.yaml`, `logging.yaml` and `view.yaml` configuration file
 - `database` root folder, with `factories`, `migrations`, `models` and `seeders` empty folders
 - `storage/logs` folder for file logs

### Changed
 - Updated framework to `0.6.1`
 - Renamed `lib` folder to `app`
 - Moved `lib/bootstrap` folder to `bootstrap` root folder
 - Moved binary file to root, renaming it `ioc` and rely on `package.json` for global installation name
 - Changed default application name to `Node IoC`
 - Updated `jest` to `24.9.0`

### Removed
 - `.babelrc` file and `babel-plugin-transform-es2015-modules-commonjs` dev package since no explicit use is required



## [0.4.2] - 2019-07-21

### Changed
 - `coverage` folder ignored on NPM deployment



## [0.4.1] - 2019-07-21

### Added
 - `.env.example` for environment file simple scaffold

### Changed
 - Updated framework to `0.4.1`
 - Use of environment variables in configuration by default
 - Updated `jest` to `24.8.0`
 - `.env` file ignored by Git

### Removed
 - `routes/controller.js` in favor of auto-registration



## [0.3.1] - 2019-07-11

### Changed
 - Updated framework to `0.3.1` (`0.3.1` did not properly boot)



## [0.3.0] - 2019-07-11

### Added
 - Node Manager with default configuration
 - `RouteServiceProvider` to enable HTTP routing features
 - `resources` directory for static files (.css, .js (browser), images, etc.) and views
 - `routes` directory for route registration, with `api.js` and `web.js` to separate the two different route types
 - `routes/controller.js` controller registration file with application controllers
 - Class-based test cases usage instead of closure-based tests
 - Default favicon
 - Small Foundation 6 HTML template scaffold
 - `app` configuration enhanced with `name`, `env`, `locale` and `fallback_locale` configuration keys
 - `AppInfoController` as API controller demo
 - `HomeController` as Web controller demo
 - Feature tests folder with test examples

 ### Changed
 - Updated framework to `0.3.0`
 - `ConsoleServiceProvider` registered through configuration instead of by `AppServiceProvider`
 - Resources folder ignored by ESLint
 - Update `@absolunet/tester` to `2.6.8`
 - `.DS_STORE` Mac file and `manager.js` file ignored on NPM deployment
 - Node.js version required to be `>=12.5.0`
 - Explicit usage of `@absolunet/private-registry` package

### Fixed
 - Test coverage folder (generated by Jest and Istanbul) ignored by Git



## [0.1.0] - 2019-03-13

### Added
 - Default structure with Node IoC framework application




[Unreleased]:    https://github.com/absolunet/node-ioc-app/compare/2.1.0...HEAD
[2.1.0]:         https://github.com/absolunet/node-ioc-app/compare/2.0.0...2.1.0
[2.0.0]:         https://github.com/absolunet/node-ioc-app/compare/1.0.1...2.0.0
[1.0.1]:         https://github.com/absolunet/node-ioc-app/compare/1.0.0-rc.2...1.0.1
[1.0.0-rc.2]:    https://github.com/absolunet/node-ioc-app/compare/1.0.0-rc.1...1.0.0-rc.2
[1.0.0-rc.1]:    https://github.com/absolunet/node-ioc-app/compare/1.0.0-beta.3...1.0.0-rc.1
[1.0.0-beta.3]:  https://github.com/absolunet/node-ioc-app/compare/1.0.0-beta.1...1.0.0-beta.3
[1.0.0-beta.1]:  https://github.com/absolunet/node-ioc-app/compare/1.0.0-alpha.4...1.0.0-beta.1
[1.0.0-alpha.4]: https://github.com/absolunet/node-ioc-app/compare/1.0.0-alpha.3...1.0.0-alpha.4
[1.0.0-alpha.3]: https://github.com/absolunet/node-ioc-app/compare/1.0.0-alpha.2...1.0.0-alpha.3
[1.0.0-alpha.2]: https://github.com/absolunet/node-ioc-app/compare/1.0.0-alpha.1...1.0.0-alpha.2
[1.0.0-alpha.1]: https://github.com/absolunet/node-ioc-app/compare/0.9.0...1.0.0-alpha.1
[0.9.0]:         https://github.com/absolunet/node-ioc-app/compare/0.8.3...0.9.0
[0.8.3]:         https://github.com/absolunet/node-ioc-app/compare/0.8.1...0.8.3
[0.8.1]:         https://github.com/absolunet/node-ioc-app/compare/0.7.1...0.8.1
[0.7.1]:         https://github.com/absolunet/node-ioc-app/compare/0.6.1...0.7.1
[0.6.1]:         https://github.com/absolunet/node-ioc-app/compare/0.6.1...0.7.1
[0.6.1]:         https://github.com/absolunet/node-ioc-app/compare/0.4.2...0.6.1
[0.4.2]:         https://github.com/absolunet/node-ioc-app/compare/0.4.1...0.4.2
[0.4.1]:         https://github.com/absolunet/node-ioc-app/compare/0.3.1...0.4.1
[0.3.1]:         https://github.com/absolunet/node-ioc-app/compare/0.3.0...0.3.1
[0.3.0]:         https://github.com/absolunet/node-ioc-app/compare/0.1.0...0.3.0
[0.1.0]:         https://github.com/absolunet/node-ioc-app/releases/tag/0.1.0
