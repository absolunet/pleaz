# Service Configuration - Docker Desktop

> [Documentation](../../../readme.md) > [Service Configuration](../../readme.md) > [Docker](docker.md)

[Docker Desktop](https://docs.docker.com/) is an easy-to-install application for your Mac or Windows environment that enables you to build and share containerized applications and microservices

## Table of Contents
1. [Configuration](#markdown-header-1-configuration)

---

## 1. Configuration

> CPUs: By default, Docker Desktop is set to use half the number of processors available on the host machine. To increase processing power, set this to a higher number; to decrease, lower the number.

> Memory: By default, Docker Desktop is set to use 2 GB runtime memory, allocated from the total available memory on your Mac. To increase the RAM, set this to a higher number. To decrease it, lower the number.

> Swap: Configure swap file size as needed. The default is 1 GB.

To configure Docker Desktop, go to `Docker > Resources`

For our use, we must set :

* **CPU**: 2

* **Memory**: 3GB

* **Swap**: 512M

> The Resources tab allows you to configure CPU, memory, disk, proxies, network, and other resources.

## 2. Usage

> To start Docker service containers, you need to be in the `config/pleaz/` directory

```bash
# Navigate to the Pleaz config directory.
cd config/pleaz/<macos|linux>
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
