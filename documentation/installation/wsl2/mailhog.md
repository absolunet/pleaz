# Installation for WSL 2 - MailHog

> [Documentation](./../../readme.md) > [Installation for WSL 2](./../readme.md) > [MailHog](./mailhog.md)

[MailHog](https://github.com/mailhog/MailHog) is an email-testing tool with a fake SMTP server.

It encapsulates the SMTP protocol with extensions and does not require specific backend implementations.

MailHog runs a super simple SMTP server that hogs outgoing emails sent to it.

## Table of Contents
1. [Create a Docker network bridge on WSL 2](#markdown-header-1-create-a-docker-network-bridge-on-wsl-2)
1. [Starting the `mailhog` service with a Docker container on WSL 2](#markdown-header-2-starting-the-mailhog-service-with-a-docker-container-on-wsl-2)

==============================================================================

==============================================================================

### Stack Requirement
Install and configure the following services

- [WSL 2 + distro Ubuntu](./TODO.md)
- [Docker for Windows](./docker.md)

## 1. Create a Docker network bridge on `WSL 2`

To establish a communication between `mailhog` and all services container we will create a network bridge `mailhog`.

Open a terminal on `WSL 2` (Ubuntu) and execute this command:
```bash
# Bash
docker network create -d bridge mailhog
```

## 2. Starting the `mailhog` service with a Docker container on `WSL 2`

Open a terminal on `WSL 2` (Ubuntu) and execute this command:

```bash
docker run \
--name mailhog -d \
--network mailhog \
-p 1025:1025 \
-p 8025:8025 \
--restart always \
mailhog/mailhog
```

> The service container will start automatically when `WSL 2` is started with the flag `--restart always`.
>

> Note: The web interface can be found at the following address:
>
> - `http://mailhog.docker:8025`
> - `http://localhost:8025`
