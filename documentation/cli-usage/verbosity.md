# Verbosity

> [Documentation](../readme.md) > [CLI usage](./readme.md)

To enable the verbose mode, the `--verbose` flag (or its alias, `-v`) can be added to any command.

By adding this verbose flag, all underlying executed commands will show up in the terminal.

```
# Non-working example for demonstration
pleaz whoami

  some-user
```

```
# Non-working example for demonstration
pleaz whoami --verbose

  >> Running
  >> whoami

  some-user
```

You will also see if any existing command from the tool was used in the chain.

```
# Non-working example for demonstration
pleaz do-multiple-tasks

  Installation successful!
  Package manager updated!
```

```
# Non-working example for demonstration
pleaz fo-multiple-tasks --verbose

  >> Running internal command
  >> install nginx

  >> Running
  >> brew install nginx

  Installation successful!

  >> Running internal command
  >> update

  >> Running
  >> brew update

  Package manager updated!
```

You can also enable multiple verbose layers to have advanced debugging logs.

```
pleaz whoami      # Verbose level 0
pleaz whoami -v   # Verbose level 1
pleaz whoami -vv  # Verbose level 2
pleaz whoami -vvv # Verbose level 3
```
