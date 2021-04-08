# Installation for macOS - PHP

> [Documentation](../readme.md) > [Installation for macOS](./readme.md) > [PHP](./php.md)

## Table of Contents
1. [Installation on macOS](#markdown-header-1-installation-on-macos)
	* [Step 1. Install Homebrew](#markdown-header-step-1-install-homebrew)
	* [Step 2. Update the Homebrew repository index](#markdown-header-step-2-update-the-homebrew-repository-index)
	* [Step 3. PHP Installation](#markdown-header-step-3-php-installation)
		* [Installation PHP versions](#markdown-header-installation-php-versions)
		* [Installation PHP extensions](#markdown-header-installation-php-extensions)
2. [Configuration](#markdown-header-2-configuration)

==============================================================================

==============================================================================

## 1. Installation on macOS

There are following steps to install multiple version of PHP on macOS:

---

### Step 1. Install Homebrew

Homebrew is a package manager for macOS that allows us to install various Unix applications easily.

To install PHP on macOS, Homebrew must be installed on the system.
If you don't have Homebrew, use the following link to install: [https://brew.sh/](https://brew.sh/)

---

### Step 2. Update the Homebrew repository index

Update the repository index of the Homebrew package installer.

```bash
brew update
```

---

### Step 3. PHP Installation

> **_NOTE:_**  **If you have existing PHP installations via Homebrew, you need to first cleanup your setup with our [Upgrading Homebrew cleanup guide](./../upgrading/cleanup-homebew-php.md) before continuing with this section.**

Remember only PHP 7.3 through 8.x are officially supported by Homebrew, but these also have to be built which is pretty slow.

PHP 8.0 has just been released and you are able to install it, but it might take some time for compatible PHP modules are fully available.

---

#### Installation PHP versions

```bash
brew install php@7.3
brew install php@7.4
```

The versions of PHP installed by Homebrew will be in the directory `/usr/local/etc/php`.

---

#### Installation PHP extensions

To install an PHP extension for a specific version with [PECL](https://pecl.php.net/).

> Replace `<PHP_VERSION>` by your version `[7.3|7.4|<MAJOR.MINOR>]`
>
> Replace `<PHP_EXTENSION>` by your desired extension

```bash
$(brew --prefix php@<PHP_VERSION>)/bin/pecl install <PHP_EXTENSION>
```

---

## 2. Configuration

> Follow instruction here: [Services configuration - PHP](./../configuration/services/php.md)
