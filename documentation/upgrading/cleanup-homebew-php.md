# Cleanup Homebrew PHP

> [Documentation](./../readme.md) > [Cleanup Homebrew PHP](./cleanup-homebew-php.md)

With the deprecation of Homebrew/php tap, many of the prior formulaes we used in this guide are no longer available

The cleanest way to migrate from the old Homebrew formulae to the new PECL package approach is to remove everything PHP-related and reinstall with the new instructions.


The first step in this process is to update all the latest packages then upgrade them.

```bash
brew update
brew upgrade
brew cleanup
```

You can then check the current installed PHP packages with:

```bash
brew list | grep php
```

Then remove everything about PHP version:

```bash
brew uninstall --force <PHP_PACKAGE>
brew cleanup
```

Check to see if anything PHP-related is left:
```bash
brew list | grep php
```

Clean out the old configuration options for PHP:
```bash
rm -Rf $(brew --prefix php)/*
```
