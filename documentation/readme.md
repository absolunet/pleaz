# Pleaz - Documentation

> [Documentation](./readme.md)

Pleaz (PHP Local Environment from A to Z), a more efficient solution to develop applications.

## Overview

### [Installation for macOS](./installation/readme.md)
1. [NGINX](./installation/nginx.md)
1. [PHP](./installation/php.md)
1. [dnsmasq](./installation/dnsmasq.md)
1. [MailHog](./installation/mailhog.md)
1. [Docker](./installation/docker.md)

### [Configuration](./configuration/readme.md)

##### Platforms
- [Default](./configuration/platform/default.md)
- [Magento 2](./configuration/platform/magento2.md)

##### Services
- [NGINX](./configuration/services/nginx.md)
- [PHP](./configuration/services/php.md)
- [dnsmasq](./configuration/services/dnsmasq.md)
- [MailHog](./configuration/services/mailhog.md)
- [Docker](./configuration/services/docker.md)

##### Project Setup
- [Project Setup](./configuration/project-setup.md)

##### Database
- [Backup/Restore](./configuration/database-backup-restore.md)

---

### FAQ

> How to cleanup Homebrew PHP properly ?
>
Follow instruction here: [Cleanup Homebrew PHP](./upgrading/cleanup-homebew-php.md)

> PECL: Bug in PHP formula which creates broken link in `/usr/local/lib/php/pecl` ?
>

```bash
$ ls /usr/local/lib/php/pecl/201*/
opcache.a opcache.so xdebug.so
```

If you see error, you might need to fix it:
```bash
cd /usr/local/lib/php
rm pecl
ln -s . pecl
```

---

## Contributing

Before contributing, refer to [Contribution Guidelines](./contributing.md)

