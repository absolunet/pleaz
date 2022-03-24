# Service Configuration - PHP

> [Documentation](../../../readme.md) > [Service Configuration](../../readme.md) > [PHP](php.md)

## Table of Contents
1. [Configuration](#markdown-header-1-configuration)
1. [Installation Xdebug](#markdown-header-2-installation-xdebug)
2. [Usage](#markdown-header-3-usage)

---

## 1. Configuration

> The majority of tools are installed via the Homebrew tool. We will refer the Homebrew root directory with <HOMEBREW_[package]>, which can be retrieved via the command `brew --prefix [package]`

> You should modify the configuration file `<HOMEBREW_[php@VERSION]>/php-fpm.d/www.conf`
>
> Replace `<PHP_VERSION>` by your version `[7.3|7.4|<MAJOR.MINOR>]`

for each version of installed PHP Version:

* edit the the file `<HOMEBREW_[php@VERSION]>/php-fpm.d/www.conf` and
* replace all content by the following configuration : [www.conf](./../../../stubs/php-fpm/context/macos/php-fpm.d/www.conf)

> We will have to give to PHP the permission to access our files and avoid an error on server start.

To do so, we change all occurence where `<USER>` is your username:
* To find your user, you can type the following command :

```bash
$ echo $USER
johndoe
```

or you can use this one line command and replace only `<PHP_VERSION>` with your specific version:

```bash
sed -i "" "s/<USER>/${USER}/" $(brew --prefix php@<PHP_VERSION>)/php-fpm.d/www.conf
```

---

For each version of PHP installed, you should add the following optimized configuration.

> This is a template for an optimisation configuration PHP with OPcache, APCu and Xdebug.
>
> Replace `<PHP_VERSION>` by your version `[7.3|7.4|<MAJOR.MINOR>]`

* Create the file `<HOMEBREW_[php@VERSION]>/conf.d/z-performance.ini`
* Add the following configuration: [z-performance.ini](./../../../stubs/php-fpm/context/macos/conf.d/z-performance.ini)

---

## 2. Installation Xdebug
- Installation of Xdebug extension for PHP [7.3|7.4|<MAJOR.MINOR>].

```bash
$(brew --prefix php@7.3)/bin/pecl install xdebug-2.9.8
$(brew --prefix php@7.4)/bin/pecl install xdebug-2.9.8
```

For each version of PHP installed, you should add the following configuration.

> Replace `<PHP_VERSION>` by your version `[7.3|7.4|<MAJOR.MINOR>]`

* Edit the file `<HOMEBREW_[php@VERSION]>/php.ini`
* Remove the line containing `zend_extension="xdebug.so"`

---

* Create the file `<HOMEBREW_[php@VERSION]>/conf.d/ext-xdebug.ini`
* Add the following configuration: [ext-xdebug.ini](./../../../stubs/php-fpm/context/macos/conf.d/ext-xdebug.ini)

---

## 3. Usage

> You can either use the native command or the `Pleaz` CLI.

> Replace `<PHP_VERSION>` by your version `[7.3|7.4|<MAJOR.MINOR>]`

* To start service:
```bash
## Native
sudo brew services start php@<PHP_VERSION>

## Pleaz CLI
pleaz service:start php <PHP_VERSION>
```

* To stop service:
```bash
# For current version
## Native
sudo brew services stop php

## Pleaz CLI
pleaz service:start stop php
```

* To restart service:
```bash
## Native
sudo brew services restart php@<PHP_VERSION>

## Pleaz CLI
pleaz service:start restart php <PHP_VERSION>
```


* To start different PHP version instances [7.3, 7.4, <MAJOR.MINOR>].
> You can run several instances of different versions of PHP at the same time.
>
> Replace `<PHP_VERSION>` by your version `[7.3|7.4|<MAJOR.MINOR>]`

Example:
```bash
# Start services
## Native
sudo brew services start php@7.3
sudo brew services start php@7.4
## Pleaz CLI
pleaz service:start php 7.3
pleaz service:start php 7.4

# Stop services
## Native
sudo brew services stop php@7.3
sudo brew services stop php@7.4
## Pleaz CLI
pleaz service:stop php 7.3
pleaz service:stop php 7.4
```

- Disable xdebug
```bash
mv $(brew --prefix php@<PHP_VERSION>)/conf.d/ext-xdebug.ini $(brew --prefix php@<PHP_VERSION>)/conf.d/ext-xdebug.ini.dis
```

- Enable xdebug
```bash
mv $(brew --prefix php@<PHP_VERSION>)/conf.d/ext-xdebug.ini.dis $(brew --prefix php@<PHP_VERSION>)/conf.d/ext-xdebug.ini
```
