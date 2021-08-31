# Installation for macOS - mkcert

> [Documentation](./../../readme.md) > [Installation for macOS](./../readme.md) > [mkcert](./mkcert.md)

[mkcert](https://github.com/FiloSottile/mkcert) is a simple zero-config tool that is used to make locally trusted development certificates.

It automatically creates and installs a local CA in the system root store, and generates locally-trusted certificates.


## Table of Contents
1. [Installation on macOS](#markdown-header-1-installation-on-macos)
1. [Generate locally trusted SSL Certificates](#markdown-header-2-generate-locally-trusted-ssl-certificates)

---

### Stack Requirement
Install and configure the following services

- [Homebrew](homebrew.md)

## 1. Installation on macOS

To install the `mkcert` :

```bash
brew install mkcert
```

#### Create a new local CA

```bash
mkcert -install
```

---

## 2. Generate locally trusted SSL Certificates

> Follow instruction here: [SSL certificates](../../procedure/macos/ssl-certificates.md)

