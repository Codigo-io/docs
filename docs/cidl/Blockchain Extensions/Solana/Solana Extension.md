---
sidebar_position: 1
---

:::info 
If you haven’t read **[Learning the Basic](linktobeadded)**, we recommend you look at that first.
:::

We can expand the capabilities of native, extended, or custom data types and instructions through extensions. An extension in the CIDL is an object composed of multiple properties that can target a specific blockchain, framework, or programming language. An extension can be defined in various places of the CIDL.

This document will show the different areas and properties available for the `solana` extension. 

## Types

We can define the `solana` extension to our custom types. The valid properties for the `solana` extension in the context of the `types` are `owner` and `seeds`. In the CIDL, it can look like this:

```
types:
  CustomDataStructure:
    # ...
    solana:
      owner: self | Pubkey
      seeds:
        - name: Static Value | Name of the seed
          type: Type of seed for non-static value
    # ...
```
- `owner`: Solana account’s owner. To learn more about this property, check **[Solana Extension - Data Types - Types](linktobeadded)**
- `seeds`: Solana PDA account’s seed definition. To learn more about this property, check **[Solana Extension - Data Types - Types](linktobeadded)**

## Fields

Some native and extended data type requires further configuration; therefore, we can define the `solana` extension to any field object. The valid properties for the `solana` extension in the context of `fields` are `attributes`. In the CIDL, it can look like this:

```
types:
  CustomDataStructure:
    # ...
    fields:
      - name: my_field
        type: string
        solana:
          attributes: [cap:26]
```
- `attributes`: Through the attributes property, we can define the capacity of the data type. To learn more about this property, check **[Solana Extension - Data Types - Native Types](linktobeadded)**

## Methods

In some cases, we need to specify additional configurations to our solana methods; this can be done through the `solana` extension. In the context of the methods, the `solana` extension defines the property `signers`. In the CIDL, it can look like this:

```
methods:
  - name: my_instruction
    solana:
      signers:
        - name: Name of the signer
          type: [Optional] Account type
          address: [Optional] Static Pubkey
          executable: [Optional] Validate if the account is a program
    # ...
```
- `signers`: We can define one or more signers to our solana instructions through the `signers` property. To learn more about this property, check **[SOLANA EXTENSION - METHODS](linktobeadded)**

## Inputs

The last place where we can define the `solana` extension is in the `inputs`. Here, we have the properties `seeds`, `attributes`, and `rent-payer`. In the CIDL, it looks like this:

```
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
          attributes: [mut, init]
          rent-payer: my_rent_payer
      - name: my_second_input
        type: string
        solana:
          attributes: [cap:26]
```
- `seeds`: The `seeds` in the context of inputs, tells the CIDL how to build the requires seeds. To learn more about this property, check **[SOLANA EXTENSION - METHODS - INPUTS](linktobeadded)**
- `attributes`:  With the `attribute` property in the input context, we can specify different values depending on the type. To learn more about this property, check **[SOLANA EXTENSION - METHODS - INPUTS](linktobeadded)**
- `rent-payer`:  Through the `rent-payer` property, we can specify from which signer we which to pay the rent of an account. To learn more about this property, check **[SOLANA EXTENSION - METHODS - INPUTS](linktobeadded)**

## Next Steps

**Congratulations!** 🎉👏 at this point, you should have a basic understanding of the sections where we can define the `solana` extension. To summarize what we learned:

- We can define the `solana` extension in the context of `types`, `fields`, `methods`, and `inputs`.
- The `solana` extension for `types` comprises the properties `owner` and `seeds`.
- The `solana` extension for `fields` comprises the property `attributes`.
- The `solana` extension for `methods` comprises the property `signers`.
- The `solana` extension for `inputs` comprises the properties `seeds`, `rent-payer`, and `attributes`.

These links may help you on your journey to writing smart contracts with the CIDL:

- **[Solana Extension - Data Types](linktobeadded)**
- **[Building Solana Program with CIDL: A Comprehensive Guide Part I](linktobeadded)**

## Join the Código community 💚
Código is growing a community of developers. Join us on [Discord](linktobeadded) or ask questions via [GitHub Discussions](linktobeadded). 