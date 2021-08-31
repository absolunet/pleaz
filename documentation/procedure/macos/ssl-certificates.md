# Create SSL Certificates (macOS)

> [Documentation](../../readme.md) > [Procedure](./../readme.md) > [SSL Certificates](ssl-certificates.md)

## Table of Contents
1. [Generate locally trusted SSL Certificates](#markdown-header-1-generate-locally-trusted-ssl-certificates)

==============================================================================

==============================================================================

### Stack Requirement
Install and configure the following services

- [Homebrew](../../installation/macos/homebrew.md)

- [NGINX](../../installation/macos/nginx.md)

- [mkcert](../../installation/macos/mkcert.md)

## 1. Generate locally trusted Wildcard SSL Certificates

> Wildcard SSL Certificates are configured to secure an unlimited amount of first-level sub domains under one main domain.
> Rather than obtaining a different SSL cert for each individual sub domain, you can instead just get one Wildcard certificate to cover them all.

By default, SSL certificates are located in `/usr/local/etc/nginx/certs/ssl/`.

> Locally trusted SSL certificates must be generated within this directory.

```bash
cd /usr/local/etc/nginx/certs/ssl/
mkcert <DOMAIN_NAME>
```

Example:
> My Domain Name is `myproject.local.test`

```bash
cd /usr/local/etc/nginx/certs/ssl/
mkcert *.local.test
```
