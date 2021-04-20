# Pleaz

[![npm][npm-badge]][npm-url]
[![npm dependencies][dependencies-badge]][dependencies-url]
[![Tests][tests-badge]][tests-url]
[![npms][npms-badge]][npms-url]
[![License: MIT][license-badge]][license-url]


> Pleaz (Project Local Environment from A to Z), a more efficient solution to develop applications.


## Install

```sh
$ npm install -g @absolunet/pleaz
```


## Usage
```sh
Available commands:
  docker
   docker:test      Validate and view the docker-compose.yml file
  php
   php:list         List all versions of PHP installed.
   php:switch       Switch current PHP version.
   php:xdebug       Get Xdebug status or enable/disable.
  service
   service:restart  Restart service [brew, nginx, php, dnsmasq, mailhog, docker, db, elasticsearch, redis, varnish, mq].
   service:start    Start service [brew, nginx, php, dnsmasq, mailhog, docker, db, elasticsearch, redis, varnish, mq].
   service:status   Get specific service status [nginx, php, dnsmasq, mailhog, db, elasticsearch, redis, varnish, mq].
   service:stop     Stop service [brew, nginx, php, dnsmasq, mailhog, docker, db, elasticsearch, redis, varnish, mq].

Options:
  -v, --verbose  Adjust the verbosity of the command.
      --version  Show version number.
      --help     Show help.
```


## Documentation

See the [full documentation](./documentation/readme.md) for an in-depth look.

See the [Changelog](CHANGELOG.md) to see what has changed.


## Contribute

See the [Contributing Guidelines](CONTRIBUTING.md) for ways to get started.

See the [Support Guide](SUPPORT.md) for ways to get help.

See the [Security Policy](SECURITY.md) for sharing vulnerability reports.

This project has a [Code of Conduct](CODE_OF_CONDUCT.md).
By interacting with this repository, organization, or community you agree to abide by its terms.


## License

[MIT](LICENSE) © [Absolunet](https://absolunet.com)




[npm-badge]:          https://img.shields.io/npm/v/@absolunet/pleaz?style=flat-square
[dependencies-badge]: https://img.shields.io/david/absolunet/pleaz?style=flat-square
[tests-badge]:        https://img.shields.io/github/workflow/status/absolunet/pleaz/tests/master?label=tests&style=flat-square
[npms-badge]:         https://badges.npms.io/%40absolunet%2Fpleaz.svg?style=flat-square
[license-badge]:      https://img.shields.io/badge/license-MIT-green?style=flat-square

[npm-url]:          https://www.npmjs.com/package/@absolunet/pleaz
[dependencies-url]: https://david-dm.org/absolunet/pleaz
[tests-url]:        https://github.com/absolunet/pleaz/actions?query=workflow%3Atests+branch%3Amaster
[npms-url]:         https://npms.io/search?q=%40absolunet%2Fpleaz
[license-url]:      https://opensource.org/licenses/MIT
