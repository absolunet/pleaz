# Installation for WSL 2 - MailHog

> [Documentation](./../../readme.md) > [Installation for WSL 2](./../readme.md) > [MailHog](./mailhog.md)

[MailHog](https://github.com/mailhog/MailHog) is an email-testing tool with a fake SMTP server.

It encapsulates the SMTP protocol with extensions and does not require specific backend implementations.

MailHog runs a super simple SMTP server that hogs outgoing emails sent to it.

## Table of Contents
1. [Create a Docker network](#markdown-header-1-create-a-docker-network)
1. [Start the `mailhog` service](#markdown-header-2-start-the-mailhog-service)

---

### Stack Requirement
Install and configure the following services

- [WSL 2 + distro Ubuntu](./TODO.md)
- [Docker for Windows](./docker.md)

## 1. Create a Docker network

To allow communication between `mailhog` and all service containers, a network bridge needs to be created (called `mailhog` ).

Open a terminal on `WSL 2` (Ubuntu) and execute this command:
```bash
# Bash
docker network create -d bridge mailhog
```

## 2. Start the `mailhog` service

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

> By using the flag `--restart always`, the container will start automatically when `WSL 2` is restarted.
>

> Note: The web interface can be found at the following address:
>
> - `http://mailhog.docker:8025`
