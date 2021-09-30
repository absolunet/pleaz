# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).






## [Unreleased]



## [1.0.0] - 2021-09-30
### Added

#### CLI
- Added command `project:create-symlinks` - Creates NGINX symlinks for the project
- Added command `service:doctor` - Returns the current state of your machine (Runs `service:status` for all services, `service:doctor nginx`, `php:list`, `php:xdebug`)
- Added command `service:doctor nginx` - Returns the current state of NGINX

#### Doc
- Added troubleshooting for NGINX and docker-compose

### Changed
#### Doc
- Changed the dnsmasq network adapter configuration for a scheduled task
- Updated default docker image for Adobe Commerce PHP (fixes a bug with readonly )
- Changed default docker image PHP Varnish (switched to `management`)
- Updated the Adobe Commerce docker-compose configuration
  - `deploy` service now runs continuously
  - Removed `depends_on` configurations (deprecated flags)



## [0.1.0] - 2021-04-21
### Added
#### Doc
- Complete documentation regarding installation and configuration on macOS.

#### CLI
##### docker
- Added command `docker:test` - Validate and view the `docker-compose.yml` file.

##### php
- Added command `php:list` - List all versions of PHP installed.
- Added command `php:switch` - Switch current PHP version.
- Added command `php:xdebug` - Get Xdebug status or enable/disable.

##### service
- Added command `service:start` - Start service [`brew`,`nginx`, `php`, `dnsmasq`, `mailhog`, `docker`, `db`, `elasticsearch`, `redis`, `varnish`, `mq`].
- Added command `service:stop` - Stop service [`brew`,`nginx`, `php`, `dnsmasq`, `mailhog`, `docker`, `db`, `elasticsearch`, `redis`, `varnish`, `mq`].
- Added command `service:restart` - Restart service [`brew`,`nginx`, `php`, `dnsmasq`, `mailhog`, `docker`, `db`, `elasticsearch`, `redis`, `varnish`, `mq`].
- Added command `service:status` - Get specific service status [`nginx`, `php`, `dnsmasq`, `mailhog`, `db`, `elasticsearch`, `redis`, `varnish`, `mq`].

##### Options
- Added Generic options
  - `-v, --verbose` - Adjust the verbosity of the command.
  - `--version` - Show version number.
  - `--help` - Show help.






[Unreleased]: https://github.com/absolunet/pleaz/compare/1.0.0...HEAD
[1.0.0]:      https://github.com/absolunet/pleaz/compare/0.1.0...1.0.0
[0.1.0]:      https://github.com/absolunet/pleaz/releases/tag/0.1.0
