---
sidebar_position: 3
---

:::note
If you haven’t read **[Solana Extension](#)**, we recommend you look at that first.
:::

In this doc, we will go through the specifics of methods in the Solana blockchain, a.k.a instructions. Let’s get started!

:::info
Anything not specified in this document is because it works exactly as how the **[Learning the Basics](#)** defines it.
:::

## Signers
One of Solana's “neat” features is that instructions support multiple signers. By default, any defined method will have one signer, commonly known as the “fee payer”. But we also can specify additional signers through the `signers` array of objects within the solana extension for the method.  In the CIDL, it can look like this:

```
methods:
  - name: my_instruction_name
    solana:
      signers:
        - name: Name of the signer
          type: [Optional] Account type
          address: [Optional] Static Pubkey
          executable: [Optional] Validate if the account is a program
    # ...
```

As convention from the Solana blockchain, when we define a custom list of signers, the first signer will be the “fee payer”. The signer object supports the following properties:

- `name`: The signer’s name; must follow the naming convention for the targeted programming language.
- `type`: [Optional] Account type; if specified, it will add the validation check that the signer’s owner field equals the owner specified in the account.
- `address`: [Optional] Static pubkey; if specified, it will add the validation check that the signer equals exactly the specified value of the `address`.
- `executable`: [Optional] Boolean value; if specified, it will add the validation that the signer’s `executable` field is set to `true` of `false`. If a value is not specified, it won’t add the validation.

:::info
 `type` and `address` are mutually exclusive; in other words, you can only specify `type` or `address`, not both simultaneously.
:::

:::caution Alert
Only Non-PDA accounts are supported as a value for `type` in the private beta.
:::

## Inputs
We can set additional configurations to inputs; here, we will concentrate on the configurations we can add when the input is an Account. For native or extended types, check [Learning the Basics](#) or [Solana Extension - Data Types](#). These additional configurations are defined within the solana extension of an input. For example:

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

:::info
Custom define data structure will be transpile to a Solana account.
:::

### Attributes

### `mut`
Whenever we need to modify an account, we must specify the `mut` attribute. This will mark the account meta from the transaction instruction as writable, and in the stub functions, the data structure will be marked as `mut`. 

### `init`
If we need to initialize an account, we specify the `init` attribute. This attribute will tell Código AI Generator to generate all the required code to initialize the given account; it can be a PDA Account or a Non-PDA Account. For example, the following CIDL will generate the corresponding smart contract:

### `init_if_needed`
Similar to **[init](#init)**. The only difference is that when specifying `init_if_needed` the generated code will add a validation check to verify if the account has already been initialized. If the account has already been initialized, it will go directly to the stub; contrary to `init` if the account has been initialized, it will throw an error. 

### Seeds

As discussed in [Solana Extension - Data Types - Seeds](#), we can create PDA accounts. When the seed is a static string, everything is handled for you. But, sometimes, we need dynamic seeds that will be set in runtime. 

By default, any dynamic seed will be added as a parameter to the client library. In other cases, we want to specify that a given input or signer must be used as the value for this dynamic seed, or we want to receive a seed value in the stub. For these cases, we use the `seeds` property.   For example:

```
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
          attributes: [ mut, init ]
	    # Seeds map
          signers:
            signer: client
            index: m_index
      - name: m_index
        type: u8
```

The `seeds` is a key-value pair, where the key is the name of the seed define in the data structure, and the value is the name of the signer or input define in the method. This way, we can link inputs or signers to seeds. 

The above example shows that the signer named `client` will be set for the seed named `signer`, and the input `m_index` will be set for the seed named `index`. 

### Rent payer
In Solana, all accounts are required to pay rent when we specify the init or init_if_needed attributes, by default, the rent payer will be the fee payer. We can overwrite this behavior by specifying the property `rent-payer` where the value is a signer's name. For example:

```
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
          attributes: [ mut, init ]
```

## Next Steps
**Congratulations!**🎉👏 at this point, you should have a basic understanding of the additional configuration we can specify to methods and inputs. To summarize what we learned:

- We can specify multiple signers to instructions through the `signers` array of objects.
- Whenever we need to make an account writable, we specify the `mut` attribute.
- To initialize an account, we can set the `init` or `init_if_needed` attribute.
- The difference between `init` and `init_if_needed` is that the former throws an error when called a second time with the same account, while the latter doesn’t.
- We can link singers and inputs to seeds; this is done through the `seeds` key-value pair. The key is the name of the defined seed, and the value is the name of the input or signer.
- To overwrite the default rent payer, we do so through the `rent-payer` property.

These links may help you on your journey to writing smart contracts with the CIDL:

- [Building Solana Program with CIDL: A Comprehensive Guide Part I](#)

### Join the Código community💚
Código is a growing community of developers. Join us on **[Discord](https://docs.google.com/forms/d/e/1FAIpQLSdSG0OgJ5xuwwU7JiSGBdn01L3ID68qNCd2HAnFSztXVYKmBg/viewform)** and **[GitHub](https://docs.google.com/forms/d/e/1FAIpQLSdGDGH4bwQf5dX3-uFCYeRKzIGbd5dVEPxHKQPTt63bBVVcVQ/viewform)** 
