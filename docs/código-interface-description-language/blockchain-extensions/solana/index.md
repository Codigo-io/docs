---
sidebar_position: 1
---

# Solana

:::tip
If you haven’t read [Learning the Basic](../../learning-the-basics.md), we recommend you look at that first.
:::

We can expand the capabilities of native, extended, or custom data types and instructions through extensions. An
extension in the CIDL is an object composed of multiple properties that can target a specific blockchain, framework, or
programming language. An extension can be defined in various places of the CIDL.

This document will show the different areas and properties available for the `solana` extension.

## Imports

For imports, we must define the solana extension when targeting the Solana blockchain.

```yaml showLineNumbers
imports:
  - ref: another_cidl
    loc: ./another_cidl.yaml
    solana:
      progid: 8WtjCDLNXNKCDzQHro6vsQT3PTUX4TuLuTbFomMSoMrs  
```

- `progid`:  Program ID of the deployed program. Accounts whose owner is set to `self` in the imported CIDL will take
  this `progid` as the owner’s value.

:::caution
Currently, `loc` only supports file system.
:::

## Types

We can define the `solana` extension to our custom types. The valid properties for the `solana` extension in the context
of the `types` are `owner`, `seeds` and `compress`. In the CIDL, it can look like this:

```yaml showLineNumbers
types:
  CustomDataStructure:
    # ...
    solana:
      owner: self | Pubkey
      compress: false | true
      seeds:
        - name: Static Value | Name of the seed
          type: Type of seed for non-static value
    # ...
```

- `owner`: Solana account’s owner. To learn more about this property, check
  [Solana Extension - Data Types - Types owner](./data-types.md#ownership)
- `seeds`: Solana PDA account’s seed definition. To learn more about this property, check
  [Solana Extension - Data Types - Types' seeds](./data-types.md#seeds)
- `compress`: Indicates the generator if this type will be used for state compression. To learn more about this
  property, check [Solana Extension - Data Types - Types](./data-types.md#compress)

## Fields

Some native and extended data type requires further configuration; therefore, we can define the `solana` extension to
any field object. The valid properties for the `solana` extension in the context of `fields` are `attributes`. In the
CIDL, it can look like this:

```yaml showLineNumbers
types:
  CustomDataStructure:
    # ...
    fields:
      - name: my_field
        type: string
        solana:
          attributes: [ cap:26 ]
```

- `attributes`: Through the attributes property, we can define the capacity of the data type. To learn more about this
  property, check [Solana Extension - Data Types](./data-types.md)

## Methods

In some cases, we need to specify additional configurations to our solana methods; this can be done through the `solana`
extension. In the context of the methods, the `solana` extension defines the properties `signers` and `default-payer`.
In the CIDL, it can
look like this:

```yaml showLineNumbers
methods:
  - name: my_instruction
    solana:
      default-payer: [ Optional ] false | true
      signers:
          - name: Name of the signer
            type: [ Optional ] Account type
            address: [ Optional ] Static Pubkey
            executable: [ Optional ] Validate if the account is a program
    # ...
```

- `default-payer`: By default, it is set to true. Set to false with an empty signer list to remove all signers from the
  method
- `signers`: We can define one or more signers to our solana instructions through the `signers` property. To learn more
  about this property, check [Solana Extension - Methods' signers](./methods.md#signers)

## Inputs

The last place where we can define the `solana` extension is in the `inputs`. Here, we have numerous
properties. In the CIDL, it looks like this:

```yaml showLineNumbers
methods:
  - name: my_instruction
    solana:
      - name: fee_payer
      - name: my_rent_payer
    inputs:
      - name: my_first_input
        type: CustomDataStructure
        solana:
          seeds:
            - seed_name: my_second_input
          attributes: [ init ]
          rent-payer: my_rent_payer
      - name: my_second_input
        type: string
      - name: account_info
        type: sol:account_info
        solana:
          attributes: [ init ]
          owner: 8WtjCDLNXNKCDzQHro6vsQT3PTUX4TuLuTbFomMSoMrs
      - name: system_program
        type: sol:account_info
        solana:
          address: 11111111111111111111111111111111
      - name: account_to_close
        type: CustomDataStructure
        solana:
          attributes: [ close ]
          rent-receiver: fee_payer
```

- `seeds`: The `seeds` in the context of inputs, tells the generator how to build match the seeds with the inputs or
  signers. To learn more about
  this property, check [Solana Extension - Methods - Inputs' seeds](./methods.md#seeds)
- `attributes`:  With the `attribute` property in the input context, we can specify different values depending on the
  type. To learn more about this property,
  check [Solana Extension - Methods - Inputs' attributes](./methods.md#attributes)
- `rent-payer`:  Through the `rent-payer` property, we can specify from which signer we which to pay the rent of an
  account. Defaults to the fee payer. To learn more about this property,
  check [Solana Extension - Methods - Inputs' rent-payer](./methods.md#rent-payer)
- `rent-receiver`: Through the `rent-receiver` property, we can specify which account will receive the lamports held by
  an account that will close. Defaults to the fee payer. To learn more about this property,
  check [Solana Extension - Methods - Inputs' rent-receiver](./methods.md#rent-receiver)
- `owner`: When working with a `sol:account_info` type, we can specify the owner of this account. This will generate the
  ownership security check for the given account.
- `address`: When working with a `sol:account_info` type, we can specify the address of this account. This will generate
  the address security check for the given account, ensuring the received account matches the address.

## Next Steps

**Congratulations!** 🎉👏 at this point, you should have a basic understanding of the sections where we can define
the `solana` extension. To summarize what we learned:

- We can define the `solana` extension in the context of `types`, `fields`, `methods`, and `inputs`.
- The `solana` extension for `types` comprises the properties `owner`, `seeds`, and `compress`.
- The `solana` extension for `fields` comprises the property `attributes`.
- The `solana` extension for `methods` comprises the property `signers` and `default-payer`.
- The `solana` extension for `inputs` comprises the properties `seeds`, `rent-payer`, `rent-receiver`, `owner`, `address` and `attributes`.

These links may help you on your journey to writing smart contracts with the CIDL:

- [Solana Extension - Data Types](./data-types.md)
- [Solana Extension - Methods](./methods.md)
- [Part I - Building Solana Programs](../../../guides/part-1-building-solana-programs.md)

## Join the Código community💚

Código is a growing community of developers. Join us on
**[Discord](https://discord.gg/8XHQGS832k)**
and **[GitHub](https://github.com/Codigo-io)**

#### Documentation detectives wanted! If you've spotted any gaps or have suggestions to level up our documentation game, we'd love to hear from you!

[![Button Example]][Link]
[Link]: https://docs.google.com/forms/d/e/1FAIpQLSdFmnE4SuzdY2_nDNgqbxsUluq_zFyIo_0LULtQW8FdtgpqlQ/viewform
[Button Example]: https://img.shields.io/badge/Feedback-FD971F?style=for-the-badge