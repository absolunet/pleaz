# Configuring a Magento2 project

> [Documentation](./../../readme.md) > [Configuration](./../readme.md) > [Magento2](./magento2.md)

## Table of Contents
1. [Configuration](#configuration)
2. [Create service containers with Docker](#service-containers-docker)
3. [Important Locations](#important-locations)

## 1. Configuration

* Build a structure into the directory `config` used for configuration into your root directory of your magento project
```bash
mkdir -p config/docker/services/nginx/includes
```

* Create the configuration file `config/docker/services/nginx/server.conf` and replace all content by: [server.conf](./../../stubs/nginx/context/servers/magento2/server.conf)

> Replace `<PHP_VERSION>` by your version `[7.3|7.4|<MAJOR.MINOR>]`
>
> Replace `<DOMAIN_NAME>` by your domain name
>
> Replace `<RELATIVE_PATH_SOURCE>` by your relative path of your magento2 source code (example: `src/store`)


* Copy the file of your `nginx.conf.sample` of the magento2 source code into `config/docker/services/nginx/includes/sites.conf`
```bash
cp <MAGENTO_SOURCE_CODE>/nginx.conf.sample config/docker/services/nginx/includes/sites.conf
```

> If you don't have the file `nginx.conf.sample` into your project magento2, you can use this file [sites.conf](./../../stubs/nginx/context/servers/magento2/includes/sites.conf)

The `sites-enabled` directory of the NGINX by default is `/usr/local/etc/nginx/sites-enabled`.
We are going to create a symbolic link from our project to this directory.

```bash
mkdir /usr/local/etc/nginx/sites-enabled/<DOMAIN_NAME>
ln -s <PROJET_DIRECTORY>/config/docker/services/nginx/server.conf /usr/local/etc/nginx/sites-enabled/<DOMAIN_NAME>.conf
ln -s <PROJET_DIRECTORY>/config/docker/services/nginx/includes /usr/local/etc/nginx/sites-enabled/<DOMAIN_NAME>/
```

Example:
> My project is `/Users/johndoe/Sites/myproject`
> My Domain Name is `myproject.test`

```bash
mkdir  /usr/local/etc/nginx/sites-enabled/myproject.test
ln -s /Users/johndoe/Sites/myproject/config/docker/services/nginx/server.conf /usr/local/etc/nginx/sites-enabled/myproject.test.conf
ln -s /Users/johndoe/Sites/myproject/config/docker/services/nginx/includes /usr/local/etc/nginx/sites-enabled/myproject.test/
```

---

## 2. Create service containers with Docker

> Please see instruction here: [Docker](./../../installation/docker.md)

---

## 3. Important locations

* Document Project Root in -> `/usr/local/var/www/`
* Locally trusted SSL Certificates in -> `/usr/local/etc/nginx/certs/ssl/`
* `Server Block` directory -> `/usr/local/etc/nginx/sites-enabled`

