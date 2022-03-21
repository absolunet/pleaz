# Troubleshooting NGINX
If you're having problems related to configuration files when trying to start NGINX, you can use the following command
(from the project root) to validate the configuration file structure and uncover problems.

```
pleaz service:doctor nginx
```

This command will for symlinks inside of the directories `$(brew --prefix nginx)/servers` and `/usr/local/var/www`.
The symlinks will be printed to the terminal. Pleaz will also validate that the symlinks are targeting absolute path.

Once the symlinks have been successfully validated, the doctor command will validate the NGINX configuration using
the command `nginx -t`. Any error returned by that command will be printed in the terminal. Refer to the NGINX documentation
to fix these errors.

