# Project Setup: Magento2

> [Documentation](./../../../readme.md) > [Project setup](./../../readme.md) > [Magento2](./magento2.md)

## Table of Contents
1. [Configuring a simple web server with PHP and SSL](#markdown-header-1-configuring-a-simple-web-server-with-php-fpm-and-ssl)
    * [Step 1. Build a structure](#markdown-header-step-1-build-a-structure)
    * [Step 2. Configure Docker environment file](#markdown-header-step-2-configure-docker-environment-file)
    * [Step 3. Park your project into the global configuration of NGINX](#markdown-header-step-3-park-your-project-into-global-configuration-of-nginx)
    * [Step 4. Configuration](#markdown-header-step-4-configuration)
    * [Step 5. Create locally trusted SSL Certificates with `mkcert`](#markdown-header-step-5-create-locally-trusted-ssl-certificates-with-mkcert)
2. [Start project](#markdown-header-2-start-project)
3. [Important Locations](#markdown-header-3-important-locations)

==============================================================================

==============================================================================

### Stack Requirement
Install and configure the following services

- [NGINX](./../../../installation/macos/nginx.md)

- [PHP](./../../../installation/macos/php.md)

- [dnsmasq](./../../../installation/macos/dnsmasq.md)

- [MailHog](./../../../installation/macos/mailhog.md)

- [Docker](./../../../installation/macos/docker.md)

## 1. Configuring magento2 project

You must configure domain `magento2.docker` into `dnsmasq` if not exists.

Edit the file `/usr/local/etc/dnsmasq.conf` and add at the end of the file:
```bash
address=/magento2.docker/127.0.0.1
```

Create the file `/etc/resolver/magento2.docker`:
```bash
echo "nameserver 127.0.0.1" > /etc/resolver/magento2.docker
```

Restart `dnsmasq`
```bash
## Native macOS
sudo brew services restart dnsmasq

## Pleaz CLI
pleaz service:restart dnsmasq
```

### Step 1. Build a structure

* Build a structure into the directory `config/pleaz/macos` used for configuration into your root directory of your project

```bash
mkdir -p config/pleaz/macos/services/nginx/includes
touch config/pleaz/macos/{.env,docker-compose.yml}
```

* Create the directory for the NGINX `server block`.

> Replace `<DOMAIN_NAME>` by your domain name

```bash
mkdir -p config/pleaz/macos/services/nginx/<DOMAIN_NAME>/includes
```

The structure should look like this:
```bash
config/
  pleaz/
    macos/
      .env
      docker-compose.yml
      services/
        nginx/
          <DOMAIN_NAME>/
            sites.conf
            includes/
              server.conf
```

### Step 2. Configure Docker environment file

#### 1. Configure the environment

Edit the file `config/pleaz/macos/.env` and replace all content by:

> Variables must be completed

- **COMPOSE_PROJECT_NAME=** "Name of your project"
- **DOMAIN_URL=** "Your domain URL without http(s)"
- **ELASTICSEARCH_IMAGE=** "Docker image used"
- **DATABASE_IMAGE=** "Docker image used"
- **REDIS_IMAGE=** "Docker image used"

Example:
> My project is `myproject`
>
> My Domain URL is `myproject.test`
>
> My Docker image database is `mariadb:10.2`
>
> My Docker image Elasticsearch is `magento/magento-cloud-docker-elasticsearch:7.9-1.2.2`
>
> My Docker image Redis is `redis:6.0`
>
> My Docker image RabbitMQ is `rabbitmq:3.8`

It will look like:

```bash
COMPOSE_PROJECT_NAME=myproject
DOMAIN_URL=myproject.test

DATABASE_IMAGE=mariadb:10.2
ELASTICSEARCH_IMAGE=magento/magento-cloud-docker-elasticsearch:7.9-1.2.2
REDIS_IMAGE=redis:6.0
RABBITMQ_IMAGE=rabbitmq:3.8
```

To find existing official version of the service images

- [Elasticsearch Docker Hub](https://hub.docker.com/r/magento/magento-cloud-docker-elasticsearch/tags?page=1&ordering=last_updated)
- [Redis Docker Hub](https://hub.docker.com/_/redis?tab=tags&page=1&ordering=last_updated)
- [RabbitMQ Docker Hub](https://hub.docker.com/_/rabbitmq?tab=tags&page=1&ordering=last_updated)
- [MariaDB Docker Hub](https://hub.docker.com/_/mariadb?tab=tags&page=1&ordering=last_updated)
- [MySQL Docker Hub](https://hub.docker.com/_/mysql?tab=tags&page=1&ordering=last_updated)


#### 2. Configure services containers

Edit the file `config/pleaz/macos/docker-compose.yml` and replace all content by: [docker-compose.magento.yml](./../../../stubs/docker/docker-compose.magento.yml)

---

### Step 3. Park your project into the global configuration of NGINX

> For easier maintenance, we will centralize the point of entry of projects in the configuration of NGINX.

The root directory of the NGINX by default is `/usr/local/var/www`. We are going to create a symbolic link from our project to this directory.

```bash
ln -s <ABSOLUTE_PATH_PROJECT_DIRECTORY> /usr/local/var/www/<DOMAIN_NAME>
```

Example:
> My project is `/Users/johndoe/Sites/myproject`
> My Domain Name is `myproject.test`

```bash
ln -s /Users/johndoe/Sites/myproject /usr/local/var/www/myproject.test
```

---

### Step 4. Server configuration

* Create the configuration file `config/pleaz/macos/services/nginx/<DOMAIN_NAME>/server.conf` and replace all content by: [server.conf](../../../stubs/nginx/context/servers/magento2/server.conf)

> Replace `<PHP_VERSION>` by your version `[7.3|7.4|<MAJOR.MINOR>]`
>
> Replace `<DOMAIN_NAME>` by your domain name
>
> Replace `<RELATIVE_PATH_SOURCE>` by your relative path of your source code (example: `src/store`)

* Copy the file of your `nginx.conf.sample` of the magento2 source code into `config/pleaz/macos/services/nginx/<DOMAIN_NAME>/includes/sites.conf`
```bash
cp <MAGENTO_SOURCE_CODE>/nginx.conf.sample config/pleaz/macos/services/nginx/<DOMAIN_NAME>/includes/sites.conf
```

> If you don't have the file `nginx.conf.sample` into your project magento2, you can use this file [sites.conf](../../../stubs/nginx/context/servers/magento2/includes/sites.conf)

* Modify the upstream `fastcgi_backend` into the file `config/pleaz/macos/services/nginx/<DOMAIN_NAME>/includes/sites.conf` variable with the correct PHP version used. See upstream variable [NGINX - Configuration](../../../configuration/services/nginx.md)

> Replace `fastcgi_backend` by `fastcgi_backend<PHP_VERSION>`

ie:

Your PHP version is 7.3.
> Replace `fastcgi_backend` by `fastcgi_backend7.3`

```bash
sed -i "" "s/fastcgi_backend/fastcgi_backend7.3/" config/pleaz/macos/services/nginx/<DOMAIN_NAME>/includes/sites.conf
```

Your PHP version is 7.4.
> Replace `fastcgi_backend` by `fastcgi_backend7.4`

```bash
sed -i "" "s/fastcgi_backend/fastcgi_backend7.4/" config/pleaz/macos/services/nginx/<DOMAIN_NAME>/includes/sites.conf
```

---

The `servers` directory of the NGINX by default is `/usr/local/etc/nginx/servers`.
We are going to create a symbolic link from our project to this directory.

> Replace `<DOMAIN_NAME>` by your domain name

```bash
ln -s <PROJECT_ROOT>/config/pleaz/macos/services/nginx/<DOMAIN_NAME> /usr/local/etc/nginx/servers/
```

Example:
> My project is `/Users/johndoe/Sites/myproject`
> My Domain Name is `myproject.test`

```bash
ln -s /Users/johndoe/Sites/myproject/config/pleaz/macos/services/nginx/myproject.test /usr/local/etc/nginx/servers/
```

---

### Step 5. Create locally trusted SSL Certificates with `mkcert`

> Please see instruction here: [SSL certificates](./../../../procedure/ssl-certificates.md)

---

## 2. Start project

#### (macOS)

```bash
$ cd config/pleaz/macos

## Start docker services (MySQL)
$ docker-compose up -d

> You can either use the native command or the `Pleaz` CLI.

## Native
sudo brew services start nginx
sudo brew services start dnsmasq
sudo brew services start mailhog
sudo brew services start php@<PHP_VERSION>

## Pleaz CLI
pleaz service:start nginx
pleaz service:start dnsmasq
pleaz service:start mailhog
pleaz service:start php <PHP_VERSION>
```

## 3. Important locations

* Document Project Root in -> `/usr/local/var/www/`
* Locally trusted SSL Certificates in -> `/usr/local/etc/nginx/certs/ssl/`
* `Server Block` directory -> `/usr/local/etc/nginx/servers`
* `pleaz` Configuration directory -> `<PROJET_ROOT>/config/pleaz`
