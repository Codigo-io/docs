---
sidebar_position: 3
---

# Methods

:::tip
If you haven’t read [Solana Extension](./index.md), we recommend you look at that first.
:::

In this doc, we will go through the specifics of methods in the Solana blockchain, a.k.a instructions. Let’s get
started!

:::note
Anything not specified in this document is because it works exactly as how
the [Learning the Basics](../../learning-the-basics.md) defines it.
:::

## Default payer
The generator will automatically add a default fee payer to each transaction that will be an expected signer. This behavior can be deactivated by specifying the `default-payer` property to the method’s solana extension. In the CIDL it looks as follows:

```yaml showLineNumbers
methods:
  - name: disable_default_payer
    solana:
      default-payer: false
```

## Signers

One of Solana's “neat” features is that instructions support multiple signers. By default, any defined method will have
one signer, commonly known as the “fee payer”. But we also can specify additional signers through the `signers` array of
objects within the solana extension for the method. In the CIDL, it can look like this:

```yaml showLineNumbers
methods:
  - name: my_instruction_name
    solana:
      signers:
        - name: Name of the signer
          type: [ Optional ] Account type
          address: [ Optional ] Static Pubkey
          executable: [ Optional ] Validate if the account is a program
    # ...
```

As convention from the Solana blockchain, when we define a custom list of signers, the first signer will be the “fee
payer”. The signer object supports the following properties:

- `name`: The signer’s name; must follow the naming convention for the targeted programming language.
- `type`: [Optional] Account type; if specified, it will add the validation check that the signer’s owner field equals
  the owner specified in the account.
- `address`: [Optional] Static pubkey; if specified, it will add the validation check that the signer equals exactly the
  specified value of the `address`.
- `executable`: [Optional] Boolean value; if specified, it will add the validation that the signer’s `executable` field
  is set to `true` of `false`. If a value is not specified, it won’t add the validation.

:::info
`type` and `address` are mutually exclusive; in other words, you can only specify `type` or `address`, not both
simultaneously.
:::

:::caution Alert
Only Non-PDA accounts are supported as a value for `type` in the public beta.
:::

## Uses
Another of Solana's “neat” features that unlocks a realm of possibilities is Cross Program Invocation (CPI). This feature allows developers to call other programs' instructions from their program. After importing a CIDL we can reference other CIDL methods within the `uses` property. The `uses` is an array of strings. In the CIDL it looks as follows:

```yaml showLineNumbers
imports:
  - ref: cidl_b
    loc: ./cidl_b.yaml
    solana:
      progid: MyCIDLBProgramId
methods:
  - name: do_work
    uses:
      - cidl_b.ix1
      - cidl_b.ix2
```

In the `uses` property you can reference as many instructions as your use case requires. When using uses, there are some rules to remember:
- The generator will automatically add the accounts the referenced method requires, including the program account.
- The permission will be elevated if applicable
- When an account input has the same name and data type between the referenced methods or the local method, this will be treated as the same input.
- The data instruction arguments must be specified by the developer.
- PDA accounts with dynamic seeds; the dynamic seed’s inputs will always be generated unless the PDA requires initialization.
- If an account needs to be initialized in the referenced method, and this account has a data structure defined; the account will be transpiled into an account info.

## Inputs

We can set additional configurations to inputs; here, we will concentrate on the configurations we can add when the
input is an Account. For native or extended types, check [Learning the Basics](../../learning-the-basics.md)
or [Solana Extension - Data Types](./data-types.md). These additional configurations are defined within the solana
extension of an input. For example:

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

:::note
Custom define data structure will be transpile to a Solana account.
:::

### Attributes

#### `mut`

Whenever we need to modify an account, we must specify the `mut` attribute. This will mark the account meta from the
transaction instruction as writable, and in the stub functions, the data structure will be marked as `mut`.

:::info
Accounts not owned by your program can be marked as `mut`; this will set the `is_writable` property to true and, in the program, will define an immutable variable to store the account.
:::
#### `init`

If we need to initialize an account, we specify the `init` attribute. This attribute will tell Código Generator to
generate all the required code to initialize the given account; it can be a PDA Account or a Non-PDA Account.

:::note
If the account space (size) is greater than **10240 bytes**, the account will be created on the client side. Solana runtime doesn’t allow the creation of accounts greater than the specified size on the program.
:::
#### `init_if_needed`

Similar to [init](#init). The only difference is that when specifying `init_if_needed` the generated code will add a
validation check to verify if the account has already been initialized. If the account has already been initialized, it
will go directly to the stub; contrary to `init` if the account has been initialized, it will throw an error.

#### `close`
When we need to close an account, we specify the `close` attribute this will generate the required code to close the given account. When closing an account, Solana runtime must transfer the rent-exempt funds into another account; by default, the funds will be transferred to the fee payer. This can be overridden through the `rent-receiver` property.

:::caution
At the moment, `close` is only supported on Anchor programs.
:::

#### `space`
When specifying `init` or `init_if_needed` to a `sol:account_info`, we must set the space of the account; it can be done through the `space` attribute. In the CIDL, it looks as follows:

```yaml showLineNumbers
methods:
  - name: init_account
    inputs:
      - name: account
        type: sol:account_info
        solana:
          attributes: [init, space:50]
```

#### `cap`
When using`sol:merkle_tree` we must set the capacity of the account, we can do this through the `cap` attribute. This will tell the generator how many “accounts you which to compress within the specified merkle tree” In the CIDL, it looks as follow:

```yaml showLineNumbers
methods:
  - name: init_merkle_tree
    inputs:
      - name: account
        type: sol:merkle_tree
        solana:
          attributes: [init, cap:100000]
```

#### `canopy`
When using`sol:merkle_tree` we can optional set the [canopy](https://docs.solana.com/learn/state-compression#canopy-depth) of the account, we can do this through the `canopy` attribute. The canopy default value is 5. In the CIDL, it looks as follow:

```yaml showLineNumbers
methods:
  - name: init_merkle_tree
    inputs:
      - name: account
        type: sol:merkle_tree
        solana:
          attributes: [ init, cap:100000, canopy:6 ]
```

### Seeds

As discussed in [Solana Extension - Data Types - Seeds](./data-types#seeds),
we can create PDA accounts. When the seed is a static string, everything is handled for you. But, sometimes, we need
dynamic seeds that will be set at runtime.

By default, any dynamic seed will be added as a parameter to the client library. In other cases, we want to specify that
a given input or signer must be used as the value for this dynamic seed, or we want to receive a seed value in the stub.
For these cases, we use the `seeds` property. For example:

```yaml showLineNumbers
types:
  Record:
    solana:
      seeds:
        - name: record
        - name: signer
          type: sol:pubkey
        - name: index
          type: u8
    fields:
      - name: name
        type: string
        solana:
          attributes: [ cap:50 ]
methods:
  - name: create_user_record
    solana:
      signers:
        - name: fee_payer
        - name: client
    inputs:
      - name: user_record
        type: Record
        solana:
          attributes: [ init ]
          # Seeds map
          signers:
            signer: client
            index: m_index
      - name: m_index
        type: u8
```

The `seeds` is a key-value pair, where the key is the name of the seed define in the data structure, and the value is
the name of the signer or input define in the method. This way, we can link inputs or signers to seeds.

The above example shows that the signer named `client` will be set for the seed named `signer`, and the input `m_index`
will be set for the seed named `index`.

### Rent payer

In Solana, all accounts are required to pay rent when we specify the init or init_if_needed attributes, by default, the
rent payer will be the fee payer. We can overwrite this behavior by specifying the property `rent-payer` where the value
is a signer's name. For example:

```yaml showLineNumbers
methods:
  - name: create_user_record
    solana:
      signers:
        - name: fee_payer
        - name: custom_rent_payer
    inputs:
      - name: user_record
        type: Record
        solana:
          rent-payer: custom_rent_payer
          attributes: [ init ]
```

### Rent receiver
When closing an account, the deposited rent-exempt funds will be transferred into an account. If not specified, the fee payer of the transaction will receive these lamports. To override this behavior, we specify the `rent-receiver`. The `rent-receiver` can be another account from the input’s or signer’s list or a static pubkey.

```yaml showLineNumbers
methods:
  - name: close_user_record
    inputs:
      - name: user_record
        type: Record
        solana:
          rent-payer: custom_rent_receiver
          attributes: [ close ]
      - name: custom_rent_receiver
        type: sol:account_info
```
:::caution
 At the moment `close` is only supported on Anchor programs.
:::
## Next Steps

**Congratulations!**🎉👏 at this point, you should have a basic understanding of the additional configuration we can
specify to methods and inputs. To summarize what we learned:

- We can specify multiple signers to instructions through the `signers` array of objects.
- Whenever we need to make an account writable, we specify the `mut` attribute.
- To initialize an account, we can set the `init` or `init_if_needed` attribute.
- The difference between `init` and `init_if_needed` is that the former throws an error when called a second time with
  the same account, while the latter doesn’t.
- We can link singers and inputs to seeds; this is done through the `seeds` key-value pair. The key is the name of the
  defined seed, and the value is the name of the input or signer.
- To overwrite the default rent payer, we do so through the `rent-payer` property.

These links may help you on your journey to writing smart contracts with the CIDL:

- [Part I - Building Solana Programs](../../../guides/part-1-building-solana-programs.md)

## Join the Código community 💚

Código is a growing community of developers. Join us on
**[Discord](https://discord.gg/8XHQGS832k)**
and **[GitHub](https://github.com/Codigo-io)**

#### Documentation detectives wanted! If you've spotted any gaps or have suggestions to level up our documentation game, we'd love to hear from you!

[![Button Example]][Link]
[Link]: https://docs.google.com/forms/d/e/1FAIpQLScskk604vSIr2dBXseESYbV_pfAppx85uKEDG0lgZLGaylf6Q/viewform
[Button Example]: https://img.shields.io/badge/Feedback-FD971F?style=for-the-badge