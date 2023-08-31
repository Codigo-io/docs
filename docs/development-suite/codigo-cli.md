---
sidebar_position: 1
---

# Código's CLI

Through Código CLI, developers can interact with Código AI Generator. For the public beta, developers can only access
the Código CLI from [Código Studio](https://studio.codigo.ai). The Código CLI is configured to the PATH of the
web-based environment; thus, you can access it from the terminal by going to Terminal -> New Terminal and typing the
command `codigo`.

## Commands

## Solana
Solana sub-command to generate programs and client libraries

### generate

Generate client libraries or programs

**Flags**

| -a, --anchor  | Generates the program or client using the Anchor framework  |
|---------------|-------------------------------------------------------------|
| -c, –only-client  | Generates only the TypeScript client library  |
| -p, –only-program | Generates only the program  |
| –out-client  | Output for the generated client library  |
| –out-program | Output for the generated program  |

:::caution
For the moment, the generate command will overwrite the stub files. Make sure to save any information before rerunning
it.
:::

#### Usage

```shell
codigo solana generate /path/to/your/cidl.yaml
```

## Join the Código community 💚

Código is a growing community of developers. Join us on 
**[Discord](https://docs.google.com/forms/d/e/1FAIpQLSdSG0OgJ5xuwwU7JiSGBdn01L3ID68qNCd2HAnFSztXVYKmBg/viewform)** 
and **[GitHub](https://docs.google.com/forms/d/e/1FAIpQLSdGDGH4bwQf5dX3-uFCYeRKzIGbd5dVEPxHKQPTt63bBVVcVQ/viewform)**

#### Documentation detectives wanted! If you've spotted any gaps or have suggestions to level up our documentation game, we'd love to hear from you!

[![Button Example]][Link]
[Link]: https://docs.google.com/forms/d/e/1FAIpQLScBjQuX663e-PnJnrZokK5mEIvBp_JZE-hL1Pcn6WvnGP68_A/viewform
[Button Example]: https://img.shields.io/badge/Feedback-FD971F?style=for-the-badge