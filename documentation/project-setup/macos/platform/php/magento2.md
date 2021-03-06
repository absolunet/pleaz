# Project Setup: Magento2 (macOS)

> [Documentation](../../../../readme.md) > [Project setup](../../../readme.md) > [Magento2](magento2.md)

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

- [NGINX](../../../../installation/macos/nginx.md)
- [PHP](../../../../installation/macos/php.md)
- [dnsmasq](../../../../installation/macos/dnsmasq.md)
  - `.test` domain should be configured
- [MailHog](../../../../installation/macos/mailhog.md)
- [Docker](../../../../installation/macos/docker.md)

## 1. Configuring magento2 project

> The majority of tools are installed via the Homebrew tool. We will refer the Homebrew root directory with <HOMEBREW_[package]>, which can be retrieved via the command `brew --prefix [package]`

### Step 1. Build a structure

1. At the root of your project, add a config directory (e.g. `config/pleaz`). This will be used to store all important files for the services.

2. Add the docker config files
```bash
touch config/pleaz/macos/{.env,docker-compose.yml}
```

3. Create the directory for the NGINX `server block`.

> Replace `<DOMAIN_NAME>` by your domain name

```bash
mkdir -p config/pleaz/macos/services/nginx/<DOMAIN_NAME>/includes
touch config/pleaz/macos/services/nginx/<DOMAIN_NAME>/{server.conf,includes/sites.conf}
```

The structure should look like this:
```bash
config/
????????? pleaz/
    ????????? macos/
        ????????? .env
      	????????? docker-compose.yml
        ????????? nginx/
            ????????? <DOMAIN_NAME>/
                ????????? server.conf
                ????????? includes/
                    ????????? sites.conf
```

### Step 2. Configure Docker environment file

#### 1. Configure the environment

Edit the file `config/pleaz/macos/.env` and replace all content by:

```bash
COMPOSE_PROJECT_NAME="Name of your project"
DOMAIN_URL="Your domain URL without http(s)"
ELASTICSEARCH_IMAGE="Docker image used"
DATABASE_IMAGE="Docker image used"
REDIS_IMAGE="Docker image used"
```

> Variables must be completed


Example:
- Project name is `myproject`
- Domain URL is `myproject.test`
- Docker image for the database is `mariadb:10.2`
- Docker image for Elasticsearch is `magento/magento-cloud-docker-elasticsearch:7.9-1.2.2`
- Docker image for Redis is `redis:6.0`
- Docker image for RabbitMQ is `rabbitmq:3.8`

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

Edit the file `config/pleaz/macos/docker-compose.yml` and replace all content by: [docker-compose.magento.yml](../../../../stubs/docker/macos/docker-compose.magento.yml)

---

### Step 3. Park your project into the global configuration of NGINX

> For easier maintenance, the point of entry of projects in the configuration of NGINX has been centralized.

The web root directory of the NGINX by default is `/usr/local/var/www`. We are going to create a symbolic link from our project to this directory.

```bash
ln -s <ABSOLUTE_PATH_PROJECT_DIRECTORY> /usr/local/var/www/<DOMAIN_NAME>
```

Example:
- My project is `/Users/johndoe/Sites/myproject`
- My Domain Name is `myproject.test`

```bash
ln -s /Users/johndoe/Sites/myproject /usr/local/var/www/myproject.test
```

---

### Step 4. Server configuration

1. Edit the server configuration file `config/pleaz/macos/services/nginx/<DOMAIN_NAME>/server.conf` and replace all content by: [server.conf](../../../../stubs/nginx/context/servers/default/server.conf)

	- Replace `<PHP_VERSION>` by your version `[7.3|7.4|<MAJOR.MINOR>]`
	- Replace `<DOMAIN_NAME>` by your domain name
	- Replace `<RELATIVE_PATH_SOURCE>` by your relative path of your source code (example: `src/store`)
2. Copy the content of the provided Magento 2 NGINX config file `nginx.conf.sample` into `config/pleaz/macos/services/nginx/<DOMAIN_NAME>/includes/sites.conf`
```bash
cp <MAGENTO_SOURCE_CODE>/nginx.conf.sample config/pleaz/macos/services/nginx/<DOMAIN_NAME>/includes/sites.conf
```
> If you don't have the file `nginx.conf.sample` into your project magento2, you can use this file [sites.conf](../../../../stubs/nginx/context/servers/magento2/includes/sites.conf)

3. In the `sites.conf` file, modify the upstream `fastcgi_backend` variable with the correct PHP version used (e.g. `fastcgi_backend<PHP_VERSION>`). See upstream variable [NGINX - Configuration](../../../../configuration/services/nginx.md)
4. Park your project in the NGINX servers directory via a symlink.
	- Replace `<DOMAIN_NAME>` by your domain name

```bash
ln -s <PROJET_ROOT>/config/pleaz/macos/services/nginx/<DOMAIN_NAME> $(brew --prefix nginx)/servers/
```

Example:

- PHP version is 7.3.
- The project is located in `/Users/johndoe/Sites/myproject`
- The Domain Name is `myproject.test`

1. Configure the `server.conf`
2. Edit the fastcgi backend in the `sites.conf` (Replace `fastcgi_backend` by `fastcgi_backend7.3`)

```bash
sed -i "" "s/fastcgi_backend/fastcgi_backend7.3/" config/pleaz/macos/services/nginx/<DOMAIN_NAME>/includes/sites.conf
```
3. Park the project
```bash
ln -s /Users/johndoe/Sites/myproject/config/pleaz/macos/services/nginx/myproject.test $(brew --prefix nginx)/servers/
```

---

### Step 5. Create locally trusted SSL Certificates with `mkcert`

> Please see instruction here: [SSL certificates](../../../../procedure/macos/ssl-certificates.md)

For `Magento2`, you must create a wildcard SSL Certificate with the name `magento.crt` and `magento.key`

Open a terminal and execute:
```bash
mkcert -cert-file $(brew --prefix nginx)/certs/ssl/magento.crt -key-file $(brew --prefix nginx)/certs/ssl/magento.key "*.local.test"
```

For multiple-Domain Wildcard SSL, just add domain at the end of the command:

ie: `*.local.test` and `*.dev.test`

```bash
mkcert -cert-file $(brew --prefix nginx)/certs/ssl/magento.crt -key-file $(brew --prefix nginx)/certs/ssl/magento.key "*.local.test" "*.dev.test"
```

---

## 2. Start project

> You can either use the native command or the `Pleaz` CLI.

```bash
$ cd config/pleaz/macos

## Start docker services
$ docker-compose up -d

## Stop docker services
$ docker-compose down

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
* Locally trusted SSL Certificates in -> `<HOMEBREW_[nginx]>/certs/ssl/`
* `Server Block` directory -> `<HOMEBREW_[nginx]>/servers`
* `pleaz` Configuration directory -> `<PROJET_ROOT>/config/pleaz`
