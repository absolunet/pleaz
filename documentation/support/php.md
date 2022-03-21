### Support - PHP (macOS)

> [Documentation](./../readme.md) > [Support](./readme.md) > [PHP](./php.md)

## Frequently Asked Question

---

> How to cleanup Homebrew PHP properly ?
>
Follow instruction here: [Cleanup Homebrew PHP](./../upgrading/cleanup-homebew-php.md)

---

> PECL: Bug in PHP formula which creates broken link in `/usr/local/lib/php/pecl` ?
>

```bash
$ ls /usr/local/lib/php/pecl/201*/
opcache.a opcache.so xdebug.so
```

---

If you see error, you might need to fix it:
```bash
cd /usr/local/lib/php
rm pecl
ln -s . pecl
```

---

> For those who have problems with NGINX on `macOS`, (page not displayed or not found).
>
> Verify that the NGINX process has access to the complete disk.
>
> The fact that NGINX does not have access to the complete disk,
> prevents it from resolving the symbolic links located in `$(brew --prefix nginx)/servers`
>

Manually grant Full Disk Access: choose Apple menu > System Preferences, click Security & Privacy, then select the Privacy tab.

Scroll down and click Full Disk Access, then add the parent process.

Source : https://support.apple.com/en-us/HT210595
