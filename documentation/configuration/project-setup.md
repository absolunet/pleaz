# Project Setup

> [Documentation](./../readme.md) > [Configuration](./readme.md) > [Project setup](./project-setup.md)

## Table of Contents
1. [Configuring a web server with PHP-FPM and SSL](#configuring-a-web-server)
    * [Step 1: Build a structure](#step1)
    * [Step 2: Park you project into the global configuration of NGINX](#step2)
    * [Step 3: Create a configuration](#step3)
    * [Step 4: Create locally trusted SSL Certificates with mkcert](#step4)
2. [Create service containers with Docker](#service-containers-docker)
3. [Important Locations](#important-locations)

==============================================================================

==============================================================================

## 1. Configuring a simple web server with PHP-FPM and SSL

### Step 1: Build a structure

* Build a structure into the directory `config` used for configuration into your root directory of your project.
```bash
mkdir -p config/docker/services/nginx/includes
```

### Step 2: Park you project into the global configuration of NGINX

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

### Step 3: Create a configuration

> For a specific platform project, please see [Configuration](./readme.md)

---

### Step 4: Create locally trusted SSL Certificates with `mkcert`

> [mkcert](https://github.com/FiloSottile/mkcert) is a simple zero-config tool that is used to make locally trusted development certificates.
>
> It automatically creates and installs a local CA in the system root store, and generates locally-trusted certificates.

---

#### Installation `mkcert`

```bash
brew install mkcert
```

#### Create a new local CA

```bash
mkcert -install
```

#### Generate locally trusted SSL Certificates

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

---

## 2. Create service containers with Docker

> Please see instruction here: [Docker](./../configuration/services/docker.md)

---

## 3. Important locations

* Document Project Root in -> `/usr/local/var/www/`
* Locally trusted SSL Certificates in -> `/usr/local/etc/nginx/certs/ssl/`
* `Server Block` directory -> `/usr/local/etc/nginx/sites-enabled`
* `docker` Configuration directory -> `<PROJECT_ROOT>/config/docker`

