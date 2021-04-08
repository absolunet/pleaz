# Installation for macOS - MailHog

> [Documentation](../readme.md) > [Installation for macOS](./readme.md) > [MailHog](./mailhog.md)

[MailHog](https://github.com/mailhog/MailHog) is an email-testing tool with a fake SMTP server.

It encapsulates the SMTP protocol with extensions and does not require specific backend implementations.

MailHog runs a super simple SMTP server that hogs outgoing emails sent to it.

## Table of Contents
1. [Installation on macOS](#markdown-header-1-installation-on-macos)
	* [Step 1. Install Homebrew](#markdown-header-step-1-install-homebrew)
	* [Step 2. Update the Homebrew repository index](#markdown-header-step-2-update-the-homebrew-repository-index)
	* [Step 3. Install MailHog](#markdown-header-step-3-install-mailhog)
2. [Configuration](#markdown-header-2-configuration-mailhog)

==============================================================================

==============================================================================

## 1. Installation on macOS

There are following steps to install MailHog on macOS:

---

### Step 1. Install Homebrew

To install MailHog on macOS, Homebrew must be installed on the system.

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

### Step 3. Install MailHog

The Homebrew package installer will help install the MailHog on macOS.

To install the MailHog :

```bash
brew install mailhog
```

---

## 2. Configuration

> Follow instruction here: [Services configuration - MailHog](./../configuration/services/mailhog.md)

