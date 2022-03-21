# Project Setup: PHP (macOS)

> [Documentation](../../../../readme.md) > [Project setup](../../../readme.md) > [PHP](default.md)

## Table of Contents
1. [Configure a simple web server with PHP and SSL](#markdown-header-1-configuring-a-simple-web-server-with-php-fpm-and-ssl)
    * [Step 1. Build a structure](#markdown-header-step-1-build-a-structure)
    * [Step 2. Configure Docker environment file](#markdown-header-step-2-configure-docker-environment-file)
    * [Step 3. Park your project into the global configuration of NGINX](#markdown-header-step-3-park-your-project-into-global-configuration-of-nginx)
    * [Step 4. Server Configuration](#markdown-header-step-4-server-configuration)
    * [Step 5. Create locally trusted SSL Certificates with `mkcert`](#markdown-header-step-5-create-locally-trusted-ssl-certificates-with-mkcert)
2. [Start project](#markdown-header-2-start-project)
3. [Important Locations](#markdown-header-3-important-locations)

---

### Stack Requirement
Install and configure the following services

- [NGINX](../../../../installation/macos/nginx.md)

- [PHP](../../../../installation/macos/php.md)

- [dnsmasq](../../../../installation/macos/dnsmasq.md)

- [MailHog](../../../../installation/macos/mailhog.md)

- [Docker](../../../../installation/macos/docker.md)

## 1. Configuring a simple web server with PHP and SSL

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
└── pleaz/
    └── macos/
        ├── .env
      	├── docker-compose.yml
        └── nginx/
            └── <DOMAIN_NAME>/
                ├── server.conf
                └── includes/
                    └── sites.conf
```

### Step 2. Configure Docker environment file

#### 1. Configure the environment

Edit the file `config/pleaz/macos/.env` and replace all content by:

```bash
COMPOSE_PROJECT_NAME="Name of your project"
DOMAIN_URL="Your domain URL without http(s)"
DATABASE_IMAGE="Docker image used"
```
> Variables must be completed



Example:
- My project is `myproject`
- My Domain URL is `myproject.test`
- My Docker image database is `mysql:5.7`

It will look like:
```bash
COMPOSE_PROJECT_NAME=myproject
DOMAIN_URL=myproject.test
DATABASE_IMAGE=mysql:5.7
```

#### 2. Configure services containers

Edit the file `config/pleaz/macos/docker-compose.yml` and replace all content by: [docker-compose.php.yml](../../../../stubs/docker/macos/docker-compose.php.yml)

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

2. Edit the sites configuration file `config/pleaz/macos/services/nginx/<DOMAIN_NAME>includes/sites.conf` and replace all content by: [sites.conf](../../../../stubs/nginx/context/servers/default/includes/sites.conf)
    - Modify the upstream `fastcgi_backend` variable with the correct PHP version used (e.g. `fastcgi_backend<PHP_VERSION>`). See upstream variable [NGINX - Configuration](../../../../configuration/services/nginx.md)

3. Park your project in the NGINX servers directory via a symlink.
    - Replace `<DOMAIN_NAME>` by your domain name

```bash
ln -s <PROJET_ROOT>/config/pleaz/macos/services/nginx/<DOMAIN_NAME> $(brew --prefix nginx)/servers/
```
example:

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

---

## 2. Start project

#### (macOS)

> You can either use the native command or the `Pleaz` CLI.

```bash
$ cd config/pleaz/macos

## Start docker services
$ docker-compose up -d

## Stop docker services
$ docker-compose down

## Native services
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

---

## 3. Important locations

* Document Project Root in -> `/usr/local/var/www/`
* Locally trusted SSL Certificates in -> `$(brew --prefix nginx)/certs/ssl/`
* `Server Block` directory -> `$(brew --prefix nginx)/servers`
* `pleaz` Configuration directory -> `<PROJET_ROOT>/config/pleaz`

