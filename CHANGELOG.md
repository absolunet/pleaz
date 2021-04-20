# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).






## [Unreleased]



## [0.1.0] - 9999-01-01

### Added
- Complete documentation regarding installation and configuration on macOS.
- Added verbosity flag to improve more visibility.

#### docker
- `docker:test` - Validate and view the `docker-compose.yml` file.

#### php
- `php:list` - List all versions of PHP installed.
- `php:switch` - Switch current PHP version.
- `php:xdebug` - Get Xdebug status or enable/disable.

#### service
- `service:start` - Start service [`brew`,`nginx`, `php`, `dnsmasq`, `mailhog`, `docker`, `db`, `elasticsearch`, `redis`, `varnish`, `mq`].
- `service:stop` - Stop service [`brew`,`nginx`, `php`, `dnsmasq`, `mailhog`, `docker`, `db`, `elasticsearch`, `redis`, `varnish`, `mq`].
- `service:restart` - Restart service [`brew`,`nginx`, `php`, `dnsmasq`, `mailhog`, `docker`, `db`, `elasticsearch`, `redis`, `varnish`, `mq`].
- `service:status` - Get specific service status [`nginx`, `php`, `dnsmasq`, `mailhog`, `db`, `elasticsearch`, `redis`, `varnish`, `mq`].

#### Options
- `-v, --verbose` - Adjust the verbosity of the command.
- `--version` - Show version number.
- `--help` - Show help.







[Unreleased]: https://github.com/absolunet/pleaz/compare/0.1.0...HEAD
[0.1.0]:      https://github.com/absolunet/pleaz/releases/tag/0.1.0
