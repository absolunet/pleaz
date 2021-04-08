# Installation for macOS - dnsmasq

> [Documentation](../readme.md) > [Installation for macOS](./readme.md) > [dnsmasq](./dnsmasq.md)

[dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) is free software providing Domain Name System (DNS) caching, a Dynamic Host Configuration Protocol (DHCP) server, router advertisement and network boot features, intended for small computer networks.

## Table of Contents
1. [Installation on macOS](#markdown-header-1-installation-on-macos)
	* [Step 1. Install Homebrew](#markdown-header-step-1-install-homebrew)
	* [Step 2. Update the Homebrew repository index](#markdown-header-step-2-update-the-homebrew-repository-index)
	* [Step 3. Install dnsmasq](#markdown-header-step-3-install-dnsmasq)
2. [Configuration](#markdown-header-2-configuration)

==============================================================================

==============================================================================

## 1. Installation on macOS

Follow these steps to install `dnsmasq` on macOS:

---

### Step 1. Install Homebrew

To install `dnsmasq` on macOS, Homebrew must be installed on the system.

Homebrew is a package manager for macOS that allows us to install various Unix applications easily.

> We recommend that you update the version of Homebrew before following this guide.

To install or update Homebrew, use the following link: [https://brew.sh/](https://brew.sh/)

---

### Step 2. Update the Homebrew repository index

Update the repository index of the Homebrew package installer.

```bash
brew update
```

---

### Step 3. Install dnsmasq

The Homebrew package installer will help install dnsmasq web server on macOS.

To install the dnsmasq :

```bash
brew install dnsmasq
```

---

## 2. Configuration

> Follow instruction here: [Services configuration - dnsmasq](./../configuration/services/dnsmasq.md)

