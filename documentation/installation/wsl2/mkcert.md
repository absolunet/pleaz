# Installation for WSL 2 - mkcert

> [Documentation](./../../readme.md) > [Installation for WSL 2](./../readme.md) > [mkcert](./mkcert.md)

[mkcert](https://github.com/FiloSottile/mkcert) is a simple zero-config tool that is used to make locally trusted development certificates.

It automatically creates and installs a local CA in the system root store, and generates locally-trusted certificates.

> `mkcert` must be installed on Windows and WSL 2 (Linux)

## Table of Contents
1. [Installation on Windows](#markdown-header-1-installation-on-windows)
1. [Installation on WSL 2](#markdown-header-2-installation-on-wsl-2)
1. [Generate locally trusted SSL Certificates](#markdown-header-3-generate-locally-trusted-ssl-certificates)

---

### Stack Requirement

- [WSL 2 + distro Ubuntu](./TODO.md)

## 1. Installation on Windows and WSL 2

To install the `mkcert` on Windows:

#### Open Powershell

- Set the Ubuntu distribution as default
```powershell
# Print the distribution list
wsl --list --all

# Put the name of the Ubuntu distribution
wsl --setdefault <DISTRIBUTION_UBUNTU>
```

- Download `mkcert` for Windows
```powershell
wget -O $HOME\mkcert-windows.exe https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-windows-amd64.exe
```

- Generate `mkcert` CAROOT on Windows
```powershell
./mkcert-windows.exe -install
```

#### Open WSL 2 terminal

- Create symbolic links in the Windows `mkcert` folder to WSL 2
```bash
ln -sfn  $(wslpath "$(wslvar USERPROFILE)")/AppData/Local/mkcert ~/.local/share/mkcert
```

To install the `mkcert` on WSL 2:

- Download `mkcert` for Linux
```bash
wget -O ~/mkcert-linux https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64
chmod +x ~/mkcert-linux
```

#### Create a new local CA

Open Powershell

```bash
~/mkcert-linux -install
```

---

## 3. Generate locally trusted SSL Certificates

> Follow instruction here: [SSL certificates](../../procedure/wsl2/ssl-certificates.md)

