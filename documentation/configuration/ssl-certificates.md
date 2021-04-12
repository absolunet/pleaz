# Create SSL Certificates

> [Documentation](../readme.md) > [Configuration](readme.md) > [SSL Certificates](ssl-certificates.md)

## Table of Contents
1. [Generate locally trusted SSL Certificates](#markdown-header-1-generate-locally-trusted-ssl-certificates)

==============================================================================

==============================================================================

### Stack Requirement
Install and configure the following services
- [Homebrew](../installation/macos/homebrew.md)
- [NGINX](../installation/macos/nginx.md)
- [mkcert](../installation/macos/mkcert.md)

## 1. Generate locally trusted SSL Certificates

###### macOS
By default, SSL certificates are located in `/usr/local/etc/nginx/certs/ssl/`.

> Locally trusted SSL certificates must be generated within this directory.

```bash
cd /usr/local/etc/nginx/certs/ssl/
mkcert <DOMAIN_NAME>
```

Example:
> My Domain Name is `myproject.test`

```bash
cd /usr/local/etc/nginx/certs/ssl/
mkcert myproject.test
```
