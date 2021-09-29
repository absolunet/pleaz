# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).






## [Unreleased]

### Added

- [CLI] Added command `service:doctor` - Returns the current state of your machine (Runs `service:status` for all services, `service:doctor nginx`, `php:list`, `php:xdebug`)
- [CLI] Added nginx service doctor
- [Doc] Added troubleshooting for nginx and docker-compose

## [0.1.0] - 2021-04-21

### Added
- [Doc] Complete documentation regarding installation and configuration on macOS.

#### docker
- [CLI] Added command `docker:test` - Validate and view the `docker-compose.yml` file.

#### php
- [CLI] Added command `php:list` - List all versions of PHP installed.
- [CLI] Added command `php:switch` - Switch current PHP version.
- [CLI] Added command `php:xdebug` - Get Xdebug status or enable/disable.

#### service
- [CLI] Added command `service:start` - Start service [`brew`,`nginx`, `php`, `dnsmasq`, `mailhog`, `docker`, `db`, `elasticsearch`, `redis`, `varnish`, `mq`].
- [CLI] Added command `service:stop` - Stop service [`brew`,`nginx`, `php`, `dnsmasq`, `mailhog`, `docker`, `db`, `elasticsearch`, `redis`, `varnish`, `mq`].
- [CLI] Added command `service:restart` - Restart service [`brew`,`nginx`, `php`, `dnsmasq`, `mailhog`, `docker`, `db`, `elasticsearch`, `redis`, `varnish`, `mq`].
- [CLI] Added command `service:status` - Get specific service status [`nginx`, `php`, `dnsmasq`, `mailhog`, `db`, `elasticsearch`, `redis`, `varnish`, `mq`].

#### Options
- [CLI] Added Generic options
	- `-v, --verbose` - Adjust the verbosity of the command.
	- `--version` - Show version number.
	- `--help` - Show help.






[Unreleased]: https://github.com/absolunet/pleaz/compare/0.1.0...HEAD
[0.1.0]:      https://github.com/absolunet/pleaz/releases/tag/0.1.0
