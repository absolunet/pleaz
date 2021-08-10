# Project Setup: Magento2 (WSL 2)

> [Documentation](../../../../readme.md) > [Project setup](../../../../readme.md) > [Magento2](magento2.md)

## Table of Contents
1. [Configuring a simple web server with PHP and SSL](#markdown-header-1-configuring-a-simple-web-server-with-php-fpm-and-ssl)
	* [Step 1. Build a structure](#markdown-header-step-1-build-a-structure)
	* [Step 2. Configure Docker environment file](#markdown-header-step-2-configure-docker-environment-file)
	* [Step 3. Create locally trusted SSL Certificates](#markdown-header-step-3-create-locally-trusted-ssl-certificates)
2. [Start project](#markdown-header-2-start-project)
3. [Important Locations](#markdown-header-3-important-locations)

==============================================================================

==============================================================================

### Stack Requirement
Install and configure the following services

- [dnsmasq](../../../../installation/wsl2/dnsmasq.md)

- [Docker](../../../../installation/wsl2/docker.md)

## 1. Configuring a simple web server with PHP and SSL

### Step 1. Build a structure

* Create the following configuration files and directories inside the root directory of your project.

```bash
touch config/pleaz/linux/{.env,docker-compose.yml}
```

The structure should look like this:
```bash
config/
  pleaz/
    linux/
      .env
      docker-compose.yml
```

### Step 2. Configure Docker environment file

#### 1. Configure the environment

Edit the file `config/pleaz/linux/.env` and replace all content by: [.env.php-sample](../../../../stubs/docker/linux/.env.php-sample)

> Variables must be completed

- **COMPOSE_PROJECT_NAME=** "Name of your project"
- **DOMAIN_URL=** "Your domain URL without http(s)"
- **DATABASE_IMAGE=** "Docker image used"
- **NGINX_IMAGE=** "NGINX image used"
- **PHP_FPM_IMAGE=** "PHP-FPM image used"

Example:
> My project is `myproject`
>
> My Domain URL is `myproject.test`
>
> My Docker image database is `mysql:5.7`
>
> My Docker image NGINX is `nginx:latest`
>
> My Docker image PHP-FPM is `php:7.4`
>

It will look like:

```bash
COMPOSE_PROJECT_NAME=myproject
DOMAIN_URL=myproject.test

DATABASE_IMAGE=mysql:5.7
NGINX_IMAGE=nginx:latest
PHP_FPM_IMAGE=php:7.4
```

To find existing official version of the service images

- [NGINX Docker Hub](https://hub.docker.com/_/nginx?tab=tags&page=1&ordering=last_updated)
- [PHP Docker Hub](https://hub.docker.com/_/php?tab=tags&page=1&ordering=last_updated)
- [MariaDB Docker Hub](https://hub.docker.com/_/mariadb?tab=tags&page=1&ordering=last_updated)
- [MySQL Docker Hub](https://hub.docker.com/_/mysql?tab=tags&page=1&ordering=last_updated)


#### 2. Configure services containers

Edit the file `config/pleaz/linux/docker-compose.yml` and replace all content by: [docker-compose.php.yml](../../../../stubs/docker/linux/docker-compose.php.yml)

---

### Step 3. Create locally trusted SSL Certificates

> Work in progress.

---

## 2. Start project

#### (WSL 2)

```bash
$ cd config/pleaz/linux

## Start docker services
$ docker-compose up -d

## Stop docker services
$ docker-compose down
```

## 3. Important locations

* `pleaz` Configuration directory -> `<PROJET_ROOT>/config/pleaz`
