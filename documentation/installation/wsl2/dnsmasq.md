# Installation for WSL 2 - dnsmasq

> [Documentation](./../../readme.md) > [Installation for WSL 2](./../readme.md) > [dnsmasq](./dnsmasq.md)

[dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) is free software providing Domain Name System (DNS) caching, a Dynamic Host Configuration Protocol (DHCP) server, router advertisement and network boot features, intended for small computer networks.

## Table of Contents
1. [Add DNS servers on the WSL network adapter](#markdown-header-1-add-dns-servers-on-the-wsl-network-adapter)
1. [Configure the `dnsmasq` service on WSL 2 Ubuntu](#markdown-header-2-configure-the-dnsmasq-service-on-wsl-2)
1. [Starting the `dnsmasq` service with a Docker container on WSL 2](#markdown-header-3-starting-the-dnsmasq-service-with-a-docker-container-on-wsl-2)

---

### Stack Requirement
Install and configure the following services

- [WSL 2 + distro Ubuntu](./TODO.md)
- [Docker for Windows](./docker.md)


## 1. Change preferred DNS servers on the WSL network adapter.

In order to provide a custom dns server to windows, the `wsl` network adapter needs to be modified to use a local dns server along with the default ones.

The execution will be done on Windows with `PowerShell (Administrator)` .

```markdown
# PowerShell (Admin)
Get-NetAdapter -Name *WSL* | Select-Object InterfaceIndex | Set-DnsClientServerAddress -ServerAddresses ("1.1.1.1","127.0.0.1","8.8.8.8")
```

This will change the main DNS of the WSL network adapter to use Google, Cloudflare and local DNS (dnsmasq on Ubuntu)

## 2. Configure the dnsmasq service on `WSL 2`

On `WSL 2`, create the file `/etc/dnsmasq.conf` and add the following configuration:

```bash
#dnsmasq config, for a complete example, see:
#  http://oss.segetech.com/intra/srv/dnsmasq.conf
#log all dns queries
log-queries
#dont use hosts nameservers
no-resolv
#use cloudflare as default nameservers, prefer 1^4
server=1.0.0.1
server=1.1.1.1
strict-order
#explicitly define host-ip mappings
address=/test/127.0.0.1
address=/docker/127.0.0.1
```

If you use another local domain name, add as follows to the bottom of the dnsmasq config file:
```bash
address=/<DOMAIN_NAME>/127.0.0.1
```

## 3. Configure the dnsmasq service to start automatically with Docker

Open a terminal on `WSL 2` (Ubuntu) and execute this command:

```bash
# Bash
docker run \
--name dnsmasq -d \
-p 53:53/udp \
-p 5380:8080 \
--log-opt "max-size=100m" \
-e "HTTP_USER=foo" \
-e "HTTP_PASS=bar" \
-v /etc/dnsmasq.conf:/etc/dnsmasq.conf \
--restart always \
jpillora/dnsmasq
```

> By using the flag `--restart always`, the container will start automatically when `WSL 2` is restarted.
>

> Note: You can also connect to `http://dnsmasq.docker:5380/` to see the dnsmasq logs and change configurations.
>
> (credentials: `foo/bar`)


