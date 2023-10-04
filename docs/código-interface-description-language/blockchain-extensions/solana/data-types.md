---
sidebar_position: 2
---

# Data Types

:::tip
If you haven’t read [Solana Extension](./index.md), we recommend you look at that first.
:::

In this doc, we will go through the specifics of data types in the Solana blockchain, like strings and vector capacity,
account ownership, and much more. Let’s get started!

:::note
If a type is not specified in this document is because it works exactly as how
the [Learning the Basics](../../learning-the-basics.md) defines it.
:::

## Native Data Types

The following list is a comprehensive description of the capabilities of native data types in the Solana blockchain.

### string

When defining a field of type `string`, the `string` data type must have a fixed length because the data structure this
field belongs to will be transpile to a Solana account. The length of the string is determined by the capacity plus four
additional bytes; in these 4 bytes, we stored the capacity value.

The capacity of a string can be defined through the `attributes` property, which can be specified to fields via
the `solana` extension.

```yaml showLineNumbers
types:
  CustomDataStructure:
    fields:
      - name: my_first_field
        type: string
        solana:
          attributes: [ cap:32 ]
```

:::tip
We don’t need to specify the capacity attributes to `string` when using it in a method’s input type.
:::

## Extended Data Types

The following list is a comprehensive description of the capabilities of extended data types in the Solana blockchain.

### rs:option&lt;string&gt;

When used in a data structure field, the `rs:option<string>` data type in solana must have a fixed length; this is
because the inner type of option is a string. Thus, rs:option&lt;string&gt; capacity is defined similarly to string;
check [Solana Extension - Data Types - string](#string) to learn more.

### rs:c_option&lt;t&gt;

This extended type is intended to support only the Solana Program Library. No custom de/serialization is generated for
this type; the de/serialization depends on the spl_token crate.

### rs:vec&lt;t&gt;

When defining a field of type `rs:vec<t>`, the `rs:vec<t>` data type must have a fixed length because the data structure
this field belongs to will be transpile to a Solana account. The length of the vector is determined by the capacity plus
four additional bytes; in these 4 bytes, we stored the capacity value.

:::caution
`vec<string>` is in WIP
:::

The capacity of a vector can be defined through the `attributes` property, which can be specified to fields via
the `solana` extension.

```yaml showLineNumbers
types:
  CustomDataStructure:
    fields:
      - name: my_first_field
        type: rs:vec<u32>
        solana:
          attributes: [ cap:8 ]
```

:::tip
We don’t need to specify the capacity attributes to `rs:vec<t>` when using it in a method’s input type.
:::

### sol:account_info

Currently, the only places we can specify the `sol:account_info` data type are in the method’s input and signer types.

### sol:merkle_tree

Currently, the only places we can specify the `sol:merkle_tree` data type are in the method’s input. This extended type
is used to work with state compression.

## Types

First thing, first. **Every custom-defined type that targets the solana blockchain is treated as an Account**. If the
type doesn’t define a seed configuration (more on this in a second), the type is treated as a Non-PDA account.

Considering the above concept, let’s review the accounts' specifics.

### Account Length

All accounts in solana require a fixed size. The calculation for the account length is done automatically for the
developer by the generators and based on the defined fields.

:::info
From the account length configuration, we generate the security check that verifies the size of an account.
:::

### Ownership

As security best practices for Solana contracts, we need to verify the ownership of an account. If an account doesn’t
specify the owner, it defaults to the program’s id. We can specify the owner of an account through the `owner` property
that belongs to the `solana` extension in the context of types. In the CIDL, it looks like this:

```yaml showLineNumbers
types:
  MyAccount:
    solana:
      owner: 11111111111111111111111111111111 #SystemProgram
```

The `owner` property accepts the values:

1. `self`: This is the default value; thus, it can be omitted. This value will transpile to verify that the account’s
   owner equals the contract program’s id.
2. **Static pubkey**: A valid base58 static string. This value will transpile to verify that the account’s owner equals
   the static bas58 string.

:::info
If the type is referenced in another CIDL, the owner of the type will follow the subsequent rules:

- If the type owner is `self`, the owner will be the defined `progid` in the import
- If the type owner defined a static pubkey, the owner would be the specified static pubkey.

:::

### Compress

Within the solana extension for a type, we can set the `compress` property; the valid values are false or true, defaults
to false. When set to true, the generator will generate the corresponding code, allowing you to compress this data type.

```yaml showLineNumbers
types:
  MyAccount:
    solana:
      compress: true
```

### Seeds

To define PDA Accounts, we need to specify the `seeds` definition within the `solana` extension in the context of types.
In the CIDL, it looks like this:

:::caution
If the definition of the seed is not specified, the generators will treat the type as a Non-PDA account.
:::

```yaml showLineNumbers
types:
  MyAccountPDA:
    solana:
      seeds:
        - name: "Static value"
        - name: 16
        - name: dynamic_value
          type: string
```

The `seeds` property is an array of objects, where each object is composed of the next properties:

- `name`: Seed’s name or static value. The static value can be a string or a number.
- `type`: **[Optional]** Seed’s data type; this is needed for when the seed will be provided at runtime. It can be any
  supported [native](../../learning-the-basics.md#native-data-types) or
  the [extended data type `sol:pubkey`](../../learning-the-basics.md#extended-data-types).

## Next Steps

**Congratulations!** 🎉👏 at this point, you should have a basic understanding of how to expand the capabilities of data
types in Solana. To summarize what we learned:

- The `string` type requires a capacity.
- The `rs:option<string>` type requires a capacity.
- The `rs:vec<t>` type requires a capacity.
- The `sol:account_info` can be specified to the method’s input and signer types.
- Every custom-defined type that targets the Solana blockchain is treated as an account.
- Account length is calculated automatically, and the corresponding security checks are generated.
- Ownership security checks default to the program’s id.
- Custom-defined types that don’t specify the definition of the seed will be treated as Non-PDA accounts.

These links may help you on your journey to writing smart contracts with the CIDL:

- [Part I - Building Solana Programs](../../../guides/part-1-building-solana-programs.md)

## Join the Código community 💚

Código is a growing community of developers. Join us on
**[Discord](https://discord.gg/8XHQGS832k)**
and **[GitHub](https://github.com/Codigo-io)**

#### Documentation detectives wanted! If you've spotted any gaps or have suggestions to level up our documentation game, we'd love to hear from you!

[![Button Example]][Link]
[Link]: https://docs.google.com/forms/d/e/1FAIpQLSciAyiOm1ZiOKljysNkBpCxLayQSF67PFFraRIduAcrF2K98Q/viewform
[Button Example]: https://img.shields.io/badge/Feedback-FD971F?style=for-the-badge


