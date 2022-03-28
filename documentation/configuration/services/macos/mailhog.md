# Service Configuration - MailHog

> [Documentation](../../../readme.md) > [Service Configuration](../../readme.md) > [MailHog](mailhog.md)

## Table of Contents
1. [Configuration](#markdown-header-1-configuration)
2. [Starting MailHog](#markdown-header-2-starting)
3. [Usage](#markdown-header-3-usage)

---

## 1. Configuration

> The majority of tools are installed via the Homebrew tool. We will refer the Homebrew root directory with <HOMEBREW_[package]>, which can be retrieved via the command `brew --prefix [package]`

#### Configure your outgoing SMTP server with Sendmail

[Sendmail](https://en.wikipedia.org/wiki/Sendmail) redirects mail to MailHog using `SMTP`.

For PHP projects, you need to connect all locally installed versions of PHP to MailHog and setup to use it.

> Replace `<PHP_VERSION>` by your version `[7.3|7.4|<MAJOR.MINOR>]`

* For each PHP version, create the configuration file `<HOMEBREW_[php@VERSION]>/conf.d/z-mailhog.ini` and replace all content by:
```bash
sendmail_path = "/usr/local/bin/mailhog sendmail test@example.org"
```

* Then restart all PHP server

---

#### Create a Server Block (Optional)

MailHog runs on the localhost and listens on the `SMTP port 1025` and `HTTP port 8025`.

You can configure a [Server Block](https://www.nginx.com/resources/wiki/start/topics/examples/server_blocks/) with a NGINX reverse proxy to forward port `8025`.

To configure a `Server Block` (like "VirtualHost" Apache term), please make sure that NGINX is installed.

Otherwise, follow the instructions at [Documentation > Installation > NGINX](../../../installation/macos/nginx.md)

The default directory location of the `Server Block` is `<HOMEBREW_[nginx]>/servers/`.

Create a directory:
```bash
mkdir -p $(brew --prefix nginx)/servers/mailhog.test
```

Create the configuration file `<HOMEBREW_[nginx]>/servers/mailhog.test/mailhog.conf` and replace all content by:
```bash
server {
    listen 80;
    server_name mailhog.test;
    charset utf-8;
    client_max_body_size 128M;

    location / {
        chunked_transfer_encoding on;
        proxy_set_header X-NginX-Proxy true;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_redirect off;
        proxy_buffering off;
        proxy_pass http://localhost:8025;
    }
}
```

Before starting MailHog, ensure that NGINX server is restarted.


To access the web interface, enter : `http://mailhog.test` or `http://localhost:8025` in your browser.

---

## 3. Usage

> You can either use the native command or the `Pleaz` CLI.

#### (macOS)
* Start service:
```bash
## Native
sudo brew services start mailhog

## Pleaz CLI
pleaz service:start mailhog
```

* Stop service:
```bash
## Native
sudo brew services stop mailhog

## Pleaz CLI
pleaz service:stop mailhog
```

* Restart service:
```bash
## Native
brew services restart mailhog

## Pleaz CLI
pleaz service:restart mailhog
```
