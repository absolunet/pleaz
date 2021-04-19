# Service Configuration - dnsmasq

> [Documentation](./../../readme.md) > [Service Configuration](./../readme.md) > [dnsmasq](./dnsmasq.md)

## Table of Contents
1. [Configuration](#markdown-header-1-configuration)
1. [Important Locations](#markdown-header-2-important-locations)
1. [Usage](#markdown-header-3-usage)

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

## 2. Important Locations

#### (macOS)
* Default config -> `/usr/local/etc/dnsmasq.conf`
* Resolver configs -> `/etc/resolver/`

---

## 3. Usage

#### (macOS)
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
