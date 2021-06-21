# Troubleshooting nginx
If you're having problems related to configuration files when trying to start nginx, you can use the following command
(from the project root) to validate the configuration file structure and uncover problems.

```
pleaz service:doctor nginx
```

First, the file structure of the configuration folder will need to be validated. Inside of your project root, you should
have a `config/pleaz` directory, containing a `services` directory. It's in this directory that your nginx configuration
files should be.

```
.../project-root/
    config/
        pleaz/
            ...
            services
                ...
                nginx
                    [domain-name]/
                        server.conf
                        includes/
                            sites.conf

```

The command will use the directories from `/[project root]/config/pleaz/services/nginx` as a list of domain names to look
for in the nginx configuration. It will then look in `/usr/local/etc/nginx/servers` for a symlink pointing to each of these
directories. Once this is done, it will look for server.conf and sites.conf inside the symlink's target directory (the one
in our project's config).

Once the file structure has been successfully validated, the doctor command will validate the nginx configuration using
the command `nginx -t`. Any error returned by that command will be printed in the terminal. Refer to the nginx documentation
to fix these errors.

