---
sidebar_position: 1
---

# Código's CLI

Through Código CLI, developers can interact with Código Generator. Developers can access
the Código CLI from [Código Hub](https://hub.codigo.ai) or by downloading it
from [here](https://github.com/Codigo-io/platform/releases).

When using from Código Hub, the Código CLI is configured to the PATH of the
web-based environment; thus, you can access it from the terminal by going to Terminal -> New Terminal and typing the
command `codigo`.


## Commands

### login

Log in using your GitHub account.

**Usage**

```shell
codigo login
```

| Flags    | Usage                                               |
|----------|-----------------------------------------------------|
| --whoami | Prints the authenticated username                   |
| --logout | Sign out, the user will need to execute login again |

### upgrade

Updates the Código CLI to the latest version

**Usage**

```shell
codigo upgrade
```

| Flags          | Usage                                                                    |
|----------------|--------------------------------------------------------------------------|
| -c, --check    | Verifies if there is a new version available. Doesn't perform any update |
| -r, --rollback | Rollback the update. Fails if no update to rollback is available.        |

### solana

Sub-command to generate programs and client libraries for the Solana blockchain

#### generate

sub command to generate client libraries or programs

**Usage**

```shell
codigo solana generate /path/to/my/cidl.yaml
```

| Flags              | Usage                                                                                     |
|--------------------|-------------------------------------------------------------------------------------------|
| -a, --anchor       | Generates the program or client using the Anchor framework                                |
| --disable-diff     | Disables the diff process for the generated files. Caution: implemented code will be lost |
| -c, --only-client  | Generates only the TypeScript client library                                              |
| -p, --only-program | Generates only the program                                                                |
| –-out-client       | Output for the generated client library                                                   |
| –-out-program      | Output for the generated program                                                          |

## Join the Código community 💚

Código is a growing community of developers. Join us on
**[Discord](https://discord.gg/8XHQGS832k)**
and **[GitHub](https://github.com/Codigo-io)**
