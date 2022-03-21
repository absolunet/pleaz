# Service Configuration - NGINX

> [Documentation](../../../readme.md) > [Service Configuration](../../readme.md) > [NGINX](nginx.md)

## Table of Contents
1. [Configuration](#markdown-header-1-configuration)
1. [Starting NGINX](#markdown-header-2-starting)
1. [Important Locations](#markdown-header-3-important-locations)
1. [Usage](#markdown-header-4-usage)

---

## 1. Configuration

The default location of the `nginx.conf` on macOS after installing with Homebrew is `$(brew --prefix nginx)/nginx.conf`.

Edit the configuration file and replace all content by: [nginx.conf](../../../stubs/nginx/context/nginx.conf)

To have different version of PHP upstream, we have created variables in the nginx.conf file, inside `http` services.

```bash
   upstream fastcgi_backend7.3 {
      server unix:/var/run/php7.3-fpm.sock;
   }

   upstream fastcgi_backend7.4 {
      server unix:/var/run/php7.4-fpm.sock;
   }
```

If you install a new version of PHP, you will have to add a new variable to the file.

ie:
```bash
   upstream fastcgi_backend<PHP_VERSION> {
      server unix:/var/run/php<PHP_VERSION>-fpm.sock;
   }
```
---

We will have to give to NGINX the permission to access our files and avoid a nasty 403 Forbidden error.

To do so, we will change the first line, where `<USER>` is your username.

* To find your user, you can type the following command :

```bash
$ echo $USER
johndoe
```

Edit the file `$(brew --prefix nginx)/nginx.conf`

- Change the following parameter to:

```bash
user <USER> staff;
```

or you can use this one line command:

```bash
sed -i "" "s/<USER>/${USER}/" $(brew --prefix nginx)/nginx.conf
```

---

### Create log directory

The log directory is not created by default. We have to create it manually to avoid errors at startup.

```bash
mkdir -p $(brew --prefix nginx)/logs
```

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
* `Server Block` directory -> `$(brew --prefix nginx)/servers`
* Default config -> `$(brew --prefix nginx)/nginx.conf`
* Logs will be in -> `$(brew --prefix nginx)/logs`

---

## 4. Usage

> You can either use the native command or the `Pleaz` CLI.

#### (macOS)
* Start service:
```bash
## Native
sudo brew services start nginx

## Pleaz CLI
pleaz service:start nginx
```

* Stop service:
```bash
## Native
sudo brew services stop nginx

## Pleaz CLI
pleaz service:restart nginx
```

* Restart service:
```bash
## Native
sudo brew services restart nginx

## Pleaz CLI
pleaz service:restart nginx
```

* Check configuration file
```bash
sudo nginx -t
```
