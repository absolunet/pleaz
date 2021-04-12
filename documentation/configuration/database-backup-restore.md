# Database: Backup/Restore with Docker Volumes

> [Documentation](../readme.md) > [Services Configuration](readme.md) > [Database Backup/Restore](database-backup-restore.md)

## Table of Contents
1. [Database Backup](#markdown-header-1-database-backup)
1. [Database Restore](#markdown-header-2-database-restore)

Since the database runs on Docker, the backup and restore process is different from a local setup.
The data on docker containers is non-persistent. Therefore, the database data is stored on docker volumes.

Note: This procedure explains how to backup and restore database based on docker volumes. It can easily be changed to backup and restore mysql dump.

## 1. Database Backup

In order to backup the database, a temporary docker container is created to extract the database data.

Summary:

1. A temporary docker container is created
    - the database volume is mapped to the container
    - the `/backup` directory is mapped to the current local directory
1. A tarball is create from the database data root and saved under `/backup`
1. The temporary docker container is stopped and cleaned

> Replace `<CONTAINER_DB_NAME>` by your container database name.
> Replace `<FILENAME>` by a file name (backup tarball).

```bash
docker run --rm --volumes-from <CONTAINER_DB_NAME> -v $(pwd):/backup ubuntu tar zcvf /backup/<FILENAME>.tar.gz /var/lib/mysql
```

Example:
```bash
docker run --rm --volumes-from foo-db -v $(pwd):/backup ubuntu tar zcvf /backup/foo-db-1234.tar.gz /var/lib/mysql
```

## 2. Database Restore

In order to restore of the database, the opposite of the backup is made.

Summary:

1. A temporary docker container is created
    - the database volume is mapped to the container
    - the `/backup` directory is mapped to the current local directory
1. The database data root is cleaned
1. Your backup (tarball of a previous backup) is extracted to the database data root
1. The temporary docker container is stopped and cleaned

> Replace `<CONTAINER_DB_NAME>` by your container database name.
> Replace `<FILENAME>` by a file name.

```bash
docker run --rm --volumes-from <CONTAINER_DB_NAME> -v $(pwd):/backup ubuntu bash -c "rm -fr /var/lib/mysql/* && cd /var/lib/mysql && tar zxvf /backup/<FILENAME>.tar.gz --strip 3"
docker restart <CONTAINER_DB_NAME>
```

Example:
```bash
docker run --rm --volumes-from foo-db -v $(pwd):/backup ubuntu bash -c "rm -fr /var/lib/mysql/* && cd /var/lib/mysql && tar zxvf /backup/foo-db-1234.tar.gz --strip 3"
docker restart foo-db
```
