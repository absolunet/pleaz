# Services configuration - MailHog

> [Documentation](./../../readme.md) > [Services configuration](./../readme.md) > [MailHog](./mailhog.md)

## Table of Contents
1. [Configuration](#markdown-header-1-configuration)
2. [Starting MailHog](#markdown-header-2-starting)
3. [Usage](#markdown-header-3-usage)

==============================================================================

==============================================================================

## 1. Configuration

#### Configure your outgoing SMTP server with Sendmail

[Sendmail](https://en.wikipedia.org/wiki/Sendmail) redirects mail to MailHog using `SMTP`.

For PHP projects, you need to connect all locally installed versions of PHP to MailHog and setup to use it.

> Replace `<PHP_VERSION>` by your version `[7.3|7.4|<MAJOR.MINOR>]`

* For each PHP version, create the configuration file `/usr/local/etc/php/<PHP_VERSION>/conf.d/z-mailhog.ini` and replace all content by: [z-mailhog.ini](./../../stubs/mailhog/context/php-fpm/conf.d/z-mailhog.ini)

* Then restart all PHP server

---

#### Create a Server Block

MailHog runs on the localhost and listens on the `SMTP port 1025` and `HTTP port 8025`.

You can configure a [Server Block](https://www.nginx.com/resources/wiki/start/topics/examples/server_blocks/) with a NGINX reverse proxy to forward port `8025`.

To configure a `Server Block` (like "VirtualHost" Apache term), please make sure that NGINX is installed.

Otherwise, follow the instructions at [Documentation > Installation > NGINX](./../../installation/nginx.md)

The default directory location of the `Server Block` is `/usr/local/etc/nginx/sites-enabled/`.

Create the configuration file `/usr/local/etc/nginx/sites-enabled/mailhog.conf` and replace all content by: [mailhog.conf](./../../stubs/mailhog/context/nginx/sites-enabled/mailhog.conf)

---

## 2. Starting MailHog

Before starting MailHog, ensure that NGINX server is restarted.

```bash
sudo brew services restart nginx
```

At last, we start MailHog to activate the changes:

```bash
brew services start mailhog
```

To access the web interface, enter : `http://mailhog.test` or `http://localhost:8025` in your browser.

---

## 3. Usage

* Start service:
```bash
brew services start mailhog
```

* Stop service:
```bash
brew services stop mailhog
```

* Restart service:
```bash
brew services restart mailhog
```
