# Troubleshooting docker-compose

To troubleshoot problems with docker-compose, you can use the following command:
```
pleaz service:doctor docker
```
This command will validate the `docker-compose.yml` file by using the command `docker-compose config`. If errors are returned,
they will be printed in the terminal. Refer to docker-compose documentation to fix errors reported by the command.
