# Installation for macOS - dnsmasq

> [Documentation](../readme.md) > [Installation for macOS](./readme.md) > [dnsmasq](./dnsmasq.md)

[dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) is free software providing Domain Name System (DNS) caching, a Dynamic Host Configuration Protocol (DHCP) server, router advertisement and network boot features, intended for small computer networks.

## Table of Contents
1. [Installation (macOS)](#installing-dnsmasq-on-mac)
	* [Step 1: Download Homebrew](#installing-dnsmasq-on-mac-step1)
	* [Step 2: Update the Homebrew repository index](#installing-dnsmasq-on-mac-step2)
	* [Step 3: Install dnsmasq](#installing-dnsmasq-on-mac-step3)
2. [Configuration](#configuration)

==============================================================================

==============================================================================

## 1. Installation (macOS)

Follow these steps to install `dnsmasq` on macOS:

---

### Step 1: Install Homebrew

To install `dnsmasq` on macOS, Homebrew must be installed on the system.

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

### Step 3: Install dnsmasq

The Homebrew package installer will help install dnsmasq web server on macOS.

To install the dnsmasq :

```bash
brew install dnsmasq
```

---

## 2. Configuration

> Follow instruction here: [Services configuration - dnsmasq](./../configuration/services/dnsmasq.md)

