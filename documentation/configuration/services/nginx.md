# Service Configuration - NGINX

> [Documentation](./../../readme.md) > [Service Configuration](./../readme.md) > [NGINX](./nginx.md)

## Table of Contents
1. [Configuration](#markdown-header-1-configuration)
1. [Starting NGINX](#markdown-header-2-starting)
1. [Important Locations](#markdown-header-3-important-locations)
1. [Usage](#markdown-header-4-usage)

==============================================================================

==============================================================================

## 1. Configuration

The default location of the `nginx.conf` on macOS after installing with Homebrew is `/usr/local/etc/nginx/nginx.conf`.

Edit the configuration file and replace all content by: [nginx.conf](./../../stubs/nginx/context/nginx.conf)

We will have to give to NGINX the permission to access our files and avoid a nasty 403 Forbidden error.

To do so, we will change the first line, where `<USER>` is your username.

* To find your user, you can type the following command :

```bash
$ echo $USER
johndoe
```

Edit the file `/usr/local/etc/nginx/nginx.conf` and change the following parameter to:

```bash
user <USER> staff;
```

or you can use this one line command:

```bash
sed -i "" "s/<USER>/${USER}/" /usr/local/etc/nginx/nginx.conf
```

---

### Create log directory

The log directory is not created by default. We have to create it manually to avoid errors at startup.

```bash
mkdir -p /usr/local/etc/nginx/logs
```

### Create `Server Block` directory

The `Server Block` directory is not created by default.

````bash
mkdir -p /usr/local/etc/nginx/sites-enabled
````

---

## 2. Starting NGINX

Before starting NGINX, we can perform a test to see if everything is correct in the configuration with the following command:

```bash
sudo nginx -t
```

At last, we start NGINX to activate the changes:

> NGINX must be started as root `(sudo)` to have the necessary permissions.

#### (macOS)
```bash
sudo brew services start nginx
```

---

## 3. Important locations

#### (macOS)
* `Server Block` directory -> `/usr/local/etc/nginx/sites-enabled`
* Default config -> `/usr/local/etc/nginx/nginx.conf`
* Logs will be in -> `/usr/local/etc/nginx/logs`

---

## 4. Usage

#### (macOS)
* Start service:
```bash
sudo brew services start nginx
```

* Stop service:
```bash
sudo brew services stop nginx
```

* Restart service:
```bash
sudo brew services restart nginx
```

* Check configuration file
```bash
sudo nginx -t
```
