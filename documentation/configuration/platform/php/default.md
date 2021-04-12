# Project Setup

> [Documentation](../../../readme.md) > [Configuration](../../readme.md) > [Default](default.md)

## Table of Contents
1. [Configuring a simple web server with PHP and SSL](#markdown-header-1-configuring-a-simple-web-server-with-php-fpm-and-ssl)
    * [Step 1. Build a structure](#markdown-header-step-1-build-a-structure)
    * [Step 2. Configure Docker environment file](#markdown-header-step-2-configure-docker-environment-file)
    * [Step 3. Configure external services](#markdown-header-step-3-configure-externam-services)
    * [Step 4. Park your project into the global configuration of NGINX](#markdown-header-step-4-park-your-project-into-global-configuration-of-nginx)
    * [Step 5. Configuration](#markdown-header-step-5-configuration)
    * [Step 6. Create locally trusted SSL Certificates with `mkcert`](#markdown-header-step-6-create-locally-trusted-ssl-certificates-with-mkcert)
2. [Start project](#markdown-header-2-start-project)
3. [Important Locations](#markdown-header-3-important-locations)

==============================================================================

==============================================================================

### Stack Requirement
Install and configure the following services
- [NGINX](../../../installation/macos/nginx.md)

- [PHP](../../../installation/macos/php.md)

- [dnsmasq](../../../installation/macos/dnsmasq.md)

- [MailHog](../../../installation/macos/mailhog.md)

- [Docker](../../../installation/macos/docker.md)

## 1. Configuring a simple web server with PHP and SSL

### Step 1. Build a structure

* Build a structure into the directory `config/pleaz` used for configuration into your root directory of your project
```bash
mkdir -p config/pleaz/services/{mysql,nginx/includes}
touch config/pleaz/{.env,docker-compose.yml,services/mysql/custom.cnf}
```

The structure should look like this:
```bash
config/
  pleaz/
    .env
    docker-compose.yml
    services/
      mysql/
        custom.cnf
      nginx/
        sites.conf
        includes/
          server.conf
```

### Step 2. Configure Docker environment file

#### 1. Edit the environment's file `config/pleaz/.env` and replace all content by:

> Variables must be completed

- **COMPOSE_PROJECT_NAME=** "Name of your project"
- **DOMAIN_URL=** "Your domain URL without http(s)"
- **DATABASE_IMAGE=** "Docker image used"

Example:
> My project is `myproject`
>
> My Domain URL is `myproject.test`
>
> My Docker image database is `mysql:5.7`

It will look like:
```bash
COMPOSE_PROJECT_NAME=myproject
DOMAIN_URL=myproject.test

DATABASE_IMAGE=mysql:5.7
```

#### 2. Configure services containers file `config/pleaz/docker-compose.yml` and replace all content by: [docker-compose.php.yml](../../../stubs/docker/docker-compose.php.yml)

---

### Step 3. Configure external services

Edit the file and replace content:

- **MySQL/MariaDB:** Edit `config/pleaz/services/mysql/custom.cnf` and replace all content by: [custom.cnf](../../../stubs/docker/services/mysql/custom.cnf)


---

### Step 4. Park your project into the global configuration of NGINX

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

### Step 5. Server configuration

* Create the configuration file `config/pleaz/services/nginx/server.conf` and replace all content by: [server.conf](../../../stubs/nginx/context/servers/default/server.conf)

> Replace `<PHP_VERSION>` by your version `[7.3|7.4|<MAJOR.MINOR>]`
>
> Replace `<DOMAIN_NAME>` by your domain name
>
> Replace `<RELATIVE_PATH_SOURCE>` by your relative path of your source code (example: `src/store`)

* Create the configuration file `config/pleaz/services/nginx/includes/sites.conf` and replace all content by: [sites.conf](../../../stubs/nginx/context/servers/default/includes/sites.conf)

The `sites-enabled` directory of the NGINX by default is `/usr/local/etc/nginx/sites-enabled`.
We are going to create a symbolic link from our project to this directory.

```bash
mkdir /usr/local/etc/nginx/sites-enabled/<DOMAIN_NAME>
ln -s <PROJET_DIRECTORY>/config/pleaz/services/nginx/server.conf /usr/local/etc/nginx/sites-enabled/<DOMAIN_NAME>.conf
ln -s <PROJET_DIRECTORY>/config/pleaz/services/nginx/includes /usr/local/etc/nginx/sites-enabled/<DOMAIN_NAME>/
```

Example:
> My project is `/Users/johndoe/Sites/myproject`
> My Domain Name is `myproject.test`

```bash
mkdir  /usr/local/etc/nginx/sites-enabled/myproject.test
ln -s /Users/johndoe/Sites/myproject/config/pleaz/services/nginx/server.conf /usr/local/etc/nginx/sites-enabled/myproject.test.conf
ln -s /Users/johndoe/Sites/myproject/config/pleaz/services/nginx/includes /usr/local/etc/nginx/sites-enabled/myproject.test/
```

---

### Step 6. Create locally trusted SSL Certificates with `mkcert`

> Please see instruction here: [SSL certificates](../../../configuration/ssl-certificates.md)

---

## 2. Start project

###### macOS
```bash
$ cd config/pleaz

# Start docker services (MySQL)
$ docker-compose up -d

# Start Native services
sudo brew services start nginx
sudo brew services start dnsmasq
sudo brew services start mailhog
sudo brew services start php@<PHP_VERSION>
```

---

## 3. Important locations

* Document Project Root in -> `/usr/local/var/www/`
* Locally trusted SSL Certificates in -> `/usr/local/etc/nginx/certs/ssl/`
* `Server Block` directory -> `/usr/local/etc/nginx/sites-enabled`
* `pleaz` Configuration directory -> `<PROJECT_ROOT>/config/pleaz`

