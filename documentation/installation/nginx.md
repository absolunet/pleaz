# Installation for macOS - NGINX

> [Documentation](../readme.md) > [Installation for macOS](./readme.md) > [NGINX](./nginx.md)

## Table of Contents
1. [Installing NGINX on macOS](#installing-nginx-on-mac)
	* [Step 1: Download Homebrew](#installing-nginx-on-mac-step1)
	* [Step 2: Update the Homebrew repository index](#installing-nginx-on-mac-step2)
	* [Step 3: Install NGINX](#installing-nginx-on-mac-step3)
2. [Configuration](#configuration)

==============================================================================

==============================================================================

## 1. Installation (macOS)

There are following steps to install NGINX on macOS:

---

### Step 1: Install Homebrew

To install NGINX on macOS, Homebrew must be installed on the system.

Homebrew is a package manager for macOS that allows us to install various Unix applications easily.

> We recommend that you update the version of Homebrew before following this guide.

To install or update Homebrew, use the following link: [https://brew.sh/](https://brew.sh/)

---

### Step 2: Update the Homebrew repository index

Update the repository index of the Homebrew package installer.

```bash
brew update
```

---

### Step 3: Install NGINX

The Homebrew package installer will help install the NGINX web server on macOS.

To install the NGINX :

```bash
brew install nginx
```

After running this command, the default NGINX configuration files will be located at `/usr/local/etc/nginx`.

---

## 2. Configuration

See [Services configuration - NGINX](./../configuration/services/nginx.md)
