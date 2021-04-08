# Installation for macOS - Docker Desktop

> [Documentation](../readme.md) > [Installation for macOS](./readme.md) > [Docker](./docker.md)

[Docker Desktop](https://docs.docker.com/) is an easy-to-install application for your Mac or Windows environment that enables you to build and share containerized applications and microservices

## Table of Contents
1. [Installation Docker Desktop on macOS](#markdown-header-1-installation-docker-desktop-on-macos)
2. [Configuration](#markdown-header-2-configuration)
3. [Create service containers](#markdown-header-3-create-service-containers)

==============================================================================

==============================================================================

## 1. Installation Docker Desktop on macOS

> Follow instruction here: [Install Docker Desktop on Mac](https://docs.docker.com/docker-for-mac/install/)

## 2. Configuration

> CPUs: By default, Docker Desktop is set to use half the number of processors available on the host machine. To increase processing power, set this to a higher number; to decrease, lower the number.

> Memory: By default, Docker Desktop is set to use 2 GB runtime memory, allocated from the total available memory on your Mac. To increase the RAM, set this to a higher number. To decrease it, lower the number.

> Swap: Configure swap file size as needed. The default is 1 GB.

To configure Docker Desktop, go to `Docker > Resources`

For our use, we must set :

* **CPU**: 2

* **Memory**: 3GB

* **Swap**: 512M

> The Resources tab allows you to configure CPU, memory, disk, proxies, network, and other resources.

---

## 3. Create service containers

> Follow instruction here: [Services configuration - Docker](./../configuration/services/docker.md)

