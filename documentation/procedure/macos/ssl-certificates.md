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

By default, SSL certificates are located in `<HOMEBREW_[nginx]>/certs/ssl/`.

> Locally trusted SSL certificates must be generated within this directory.

```bash
# Create certificat wildcard SSL for *.local.test
mkcert -cert-file $(brew --prefix nginx)/certs/ssl/_wildcard.local.test.pem -key-file $(brew --prefix nginx)/certs/ssl/_wildcard.local.test-key.pem "*.local.test"
```

For multiple-Domain Wildcard SSL, just add domain at the end of the command:

ie: `*.local.test` and `*.dev.test`
```bash
mkcert -cert-file $(brew --prefix nginx)/certs/ssl/_wildcard.test.pem -key-file $(brew --prefix nginx)/certs/ssl/_wildcard.test-key.pem "*.local.test" "*.dev.test"
```
