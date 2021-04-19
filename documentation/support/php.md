### Support - PHP

> [Documentation](./../readme.md) > [Support](./readme.md) > [PHP](./php.md)

## Frequently Asked Question

---

> How to cleanup Homebrew PHP properly ?
>
Follow instruction here: [Cleanup Homebrew PHP](./../upgrading/cleanup-homebew-php.md)

> PECL: Bug in PHP formula which creates broken link in `/usr/local/lib/php/pecl` ?
>

```bash
$ ls /usr/local/lib/php/pecl/201*/
opcache.a opcache.so xdebug.so
```

If you see error, you might need to fix it:
```bash
cd /usr/local/lib/php
rm pecl
ln -s . pecl
```

---
