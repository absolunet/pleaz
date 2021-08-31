# Create SSL Certificates (WSL 2)

> [Documentation](../../readme.md) > [Procedure](./../readme.md) > [SSL Certificates](ssl-certificates.md)

## Table of Contents
1. [Generate locally trusted SSL Certificates](#markdown-header-1-generate-locally-trusted-ssl-certificates)

==============================================================================

==============================================================================

### Stack Requirement
Install and configure the following services

- [mkcert](../../installation/wsl2/mkcert.md)

## 1. Generate locally trusted Wildcard SSL Certificates

> Wildcard SSL Certificates are configured to secure an unlimited amount of first-level sub domains under one main domain.
> Rather than obtaining a different SSL cert for each individual sub domain, you can instead just get one Wildcard certificate to cover them all.

SSL certificates must be located in `/home/${env:Username}/.local/share/certs/ssl` into `WSL 2 environment`.

> Locally trusted SSL certificates must be generated within this directory.

```bash
# Create certificat wildcard SSL for *.local.test
wsl --exec /home/${env:Username}/mkcert-linux -cert-file /home/${env:Username}/.local/share/certs/ssl/_wildcard.local.test.pem -key-file /home/${env:Username}/.local/share/certs/ssl/_wildcard.local.test-key.pem "*.local.test"
```
