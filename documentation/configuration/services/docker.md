# Services configuration - Docker - Configuring service containers

> [Documentation](./../../readme.md) > [Services configuration](./../readme.md) > [Docker](./docker.md)

## Table of Contents
1. [Project setup](#markdown-header-project-setup)
2. [Usage](#markdown-header-usage)

==============================================================================

==============================================================================

## 1. Project setup

### Example

For our use, we need as services:
* Database (MySQL or MariaDB)
* Elasticsearch
* RabbitMQ
* Redis

### Step 1: Build a structure

* Build a structure into the directory `config/docker` used for configuration into your root directory of your project
```bash
mkdir -p config/docker
```

* Create a file environment `config/docker/.env` and replace all content by: [.env](./../../stubs/docker/.env)

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
> My Docker image database is `mysql:5.7`
>
> My Docker image Elasticsearh is `docker.elastic.co/elasticsearch/elasticsearch:7.7.1`
>
> My Docker image Redis is `redis:latest`
>
> My Docker image RabbitMQ is `rabbitmq:3-management`

It will look like:
```bash
COMPOSE_PROJECT_NAME=myproject
DOMAIN_URL=myproject.test

DATABASE_IMAGE=mysql:5.7
ELASTICSEARCH_IMAGE=docker.elastic.co/elasticsearch/elasticsearch:7.7.1
REDIS_IMAGE=redis:latest
RABBITMQ_IMAGE=rabbitmq:3-management
```

* Build a structure into the directory `pleaz` used for services configuration into your root directory of your project
```bash
mkdir -p config/docker/services/{mysql,elasticsearch,rabbitmq}
```

For each services, create a file and replace content:

- **MySQL/MariaDB:** Create a file `config/docker/services/mysql/custom.cnf` and replace all content by: [custom.cnf](./../../stubs/docker/services/mysql/custom.cnf)

- **Elasticsearch:** Create a file `config/docker/services/elasticsearch/elasticsearch.yml` and replace all content by: [elasticsearch.yml](./../../stubs/docker/services/elasticsearch/elasticsearch.yml)

- **RabbitMQ:** Create a file `config/docker/services/rabbitmq/enabled_plugins` and replace all content by: [enabled_plugins](./../../stubs/docker/services/rabbitmq/enabled_plugins)

* Create and configure services containers file `config/docker/docker-compose.yml` and replace all content by: [docker-compose.yml](./../../stubs/docker/docker-compose.yml)

The structure should look like this:
```bash
config/
	docker/
		.env
		docker-compose.yml
		services/
			elasticsearch/
				elasticsearch.yml
			mysql/
				custom.cnf
			rabbitmq/
				enabled_plugins
```

---

## 2. Usage

> To start Docker service containers, you need to be in the `config/docker/` directory

```bash
cd config/docker
```

* Start service container:
```bash
docker-compose up -d
```

* Stop/Pause service container:
```bash
docker-compose stop
```

* Clean all service containers:
```bash
docker-compose down
```

