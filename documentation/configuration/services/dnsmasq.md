# Services configuration - dnsmasq

> [Documentation](./../../readme.md) > [Services configuration](./../readme.md) > [dnsmasq](./dnsmasq.md)

## Table of Contents
1. [Configuration](#markdown-header-configuration)
2. [Starting dnsmasq](#markdown-header-starting)
3. [Important Locations](#markdown-header-important-locations)
4. [Usage](#markdown-header-usage)

==============================================================================

==============================================================================

## 1. Configuration

### Create a pattern to match domain

Match any request which ends the desired domain name and send 127.0.0.1 in response.

Example for the domain name `.test`:

* Edit file `/usr/local/etc/dnsmasq.conf` and add at the end of the file:

```bash
address=/test/127.0.0.1
```

You can add multiple `address` directive like that:

```bash
address=/test/127.0.0.1
address=/mydomain/127.0.0.1
```

---

### Create a resolver

Configure additional resolvers by creating configuration files in the `/etc/resolver/` directory.

This directory probably won’t exist on your system, so your first step should be to create it.

```bash
sudo mkdir -p /etc/resolver
```

you should create a new file in this directory for each resolver you want to configure.

Each resolver corresponds to a top-level domain like our `test`

* Create a file `/etc/resolver/test` and add :
```bash
nameserver 127.0.0.1
```

> If you want to add multiple domain, you should create another file with the same content.

---

## 2. Starting dnsmasq

> dnsmasq must be started as root `(sudo)` to have the necessary permissions.

```bash
sudo brew services start dnsmasq
```

---

## 3. Important Locations
* Default config -> `/usr/local/etc/dnsmasq.conf`
* Resolver configs -> `/etc/resolver/`

---

## 4. Usage

* Start service:
```bash
sudo brew services start dnsmasq
```

* Stop service:
```bash
sudo brew services stop dnsmasq
```

* Restart service:
```bash
sudo brew services restart dnsmasq
```
