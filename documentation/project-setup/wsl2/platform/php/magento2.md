# Project Setup: Magento2 (WSL 2)

> [Documentation](../../../../readme.md) > [Project setup](../../../../readme.md) > [Magento2](magento2.md)

## Table of Contents
1. [Configuring magento2 project](#markdown-header-1-configuring-magento2-project)
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

- [MailHog](../../../../installation/wsl2/mailhog.md)

- [Docker](../../../../installation/wsl2/docker.md)

## 1. Configuring magento2 project

### Step 1. Build a structure

1. At the root of your project, add a config directory (e.g. `config/pleaz`). This will be used to store all important files for the services.

2. Add the docker config files
```bash
touch config/pleaz/macos/{.env,docker-compose.yml}
```

The structure should look like this:
```bash
config/
└── pleaz/
    └── linux/
        ├── .env
        └── docker-compose.yml
```

### Step 2. Configure Docker environment file

#### 1. Configure the environment

Edit the file `config/pleaz/linux/.env` and replace all content by: [.env.magento-sample](../../../../stubs/docker/linux/.env.magento-sample)

> The following Variables must be completed. Other variables are optional.

- **COMPOSE_PROJECT_NAME=** "Name of your project"
- **DOMAIN_URL=** "Your domain URL without http(s)"
- **ELASTICSEARCH_IMAGE=** "Docker image used"
- **DATABASE_IMAGE=** "Docker image used"
- **REDIS_IMAGE=** "Docker image used"
- **NGINX_IMAGE=** "NGINX image used"
- **PHP_FPM_IMAGE=** "PHP-FPM image used"
- **PHP_CLI_IMAGE=** "PHP-CLI image used"

To find existing official version of the service images

- [NGINX Docker Hub](https://hub.docker.com/r/magento/magento-cloud-docker-nginx/tags?page=1&ordering=last_updated)
- [PHP Docker Hub](https://hub.docker.com/r/magento/magento-cloud-docker-php/tags?page=1&ordering=last_updated)
- [Elasticsearch Docker Hub](https://hub.docker.com/r/magento/magento-cloud-docker-elasticsearch/tags?page=1&ordering=last_updated)
- [Redis Docker Hub](https://hub.docker.com/_/redis?tab=tags&page=1&ordering=last_updated)
- [RabbitMQ Docker Hub](https://hub.docker.com/_/rabbitmq?tab=tags&page=1&ordering=last_updated)
- [MariaDB Docker Hub](https://hub.docker.com/_/mariadb?tab=tags&page=1&ordering=last_updated)
- [MySQL Docker Hub](https://hub.docker.com/_/mysql?tab=tags&page=1&ordering=last_updated)


#### 2. Configure services container

Edit the file `config/pleaz/linux/docker-compose.yml` and replace all content by: [docker-compose.magento.yml](../../../../stubs/docker/linux/docker-compose.magento.yml)

---

### Step 3. Create locally trusted SSL Certificates

> Work in progress.

---

## 2. Start project

```bash
cd config/pleaz/linux

## Start docker services
docker-compose up -d

## Stop docker services
docker-compose down

## Execute magento commands
docker-compose run --rm deploy magento-command <your-command>
#e.g.
docker-compose run --rm deploy magento-command cache:flush
```

## 3. Important locations

* `pleaz` Configuration directory -> `<PROJET_ROOT>/config/pleaz`
