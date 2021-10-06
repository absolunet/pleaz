# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).






## [Unreleased]



## [1.1.0] - 2021-10-06
### Changed
#### Doc (WSL 2)
- Improve the SSL certificate generation process on WSL 2
- Added the missing variable `MAGENTO_RUN_MODE` into the service container `web` (NGINX) on `docker-compose.magento.yml` file
- Added a volume into the service container `elasticsearch` to avoid data loss on `docker-compose.magento.yml` file
- Added a mount volume to override `php-fpm.conf` on service container `fpm`. Fix issue with file's permission.


## [1.0.0] - 2021-09-30
### Added

#### CLI (macOS)
- Added command `project:create-symlinks` - Creates NGINX symlinks for the project
- Added command `service:doctor` - Returns the current state of your machine (Runs `service:status` for all services, `service:doctor nginx`, `php:list`, `php:xdebug`)
- Added command `service:doctor nginx` - Returns the current state of NGINX

#### Doc (macOS)
- Added troubleshooting for NGINX and docker-compose

### Changed
#### Doc (WSL 2)
- Changed the dnsmasq network adapter configuration for a scheduled task
- Updated default docker image for Adobe Commerce PHP (fixes a bug with readonly)
  - `magento/magento-cloud-docker-php:7.4-fpm-1.2.4`
  - `magento/magento-cloud-docker-php:7.4-cli-1.2.4`
- Changed default docker image PHP rabbitmq
  - `rabbitmq:3.8` --> `rabbitmq:3.8-management`
- Updated the Adobe Commerce `docker-compose.yml` configuration
  - `deploy` service now runs continuously (changed the entrypoint)
  - Removed `depends_on` configurations (deprecated docker-compose flags)
- To execute commands on `deploy`: `docker exec -it {myproject}-deploy {command}`



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






[Unreleased]: https://github.com/absolunet/pleaz/compare/1.1.0...HEAD
[1.1.0]:      https://github.com/absolunet/pleaz/compare/1.0.0...1.1.0
[1.0.0]:      https://github.com/absolunet/pleaz/compare/0.1.0...1.0.0
[0.1.0]:      https://github.com/absolunet/pleaz/releases/tag/0.1.0
