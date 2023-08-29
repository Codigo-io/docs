---
sidebar_position: 2
---

# Learning the Basics

Código's Interface Description Language (short: CIDL), is the main configuration file for your dApp projects. Through
the CIDL, we define the interface of a smart contract. The CIDL is written in YAML format; thus, the created file must
have the .yaml or .yml file extension.

In this document, we will go through the basic structure of the CIDL. The CIDL learning curve is minimal; a slight
complexity is introduced when working with the CIDL extensions.

:::info

An extension in the CIDL is an object composed of multiple properties that can target a specific blockchain, framework,
or programming language. An extension can be defined in various places of the CIDL; learn more about [Blockchain
Extensions](/category/blockchain-extensions).

:::

If you want a more in-depth technical read on the structure and all the available properties, check the
[CIDL Specification](./specification)

## Basic Contract Information

Each CIDL file we create must define some basic information. These pieces of information will help other developers
understand what the contract is about and will help our generators.

```yaml showLineNumbers
cidl: 0.8
info:
  name: my_contract_name
  title: My pretty contract name
  version: 0.0.1
  summary: What this contract is about
  license:
    name: Unlicensed
```

The above properties are the **required** or **recommended** properties that any CIDL needs as basic contract
information. Let’s quickly go through each property:

- `cidl`: The version of the CIDLSpecification we are targeting.
- `name`: The contract’s name; must follow the convention of the targeted programming language.
- `title`: A pretty name to be used in the web-based documentation.
- `version`: The contract version, must follow the semantic versioning convention.
- `summary`: This recommended property enables developers to generate web-based documentation.
- `license.name`: The license’s name. This will be the license of the contract and SDK clients.

We can specify additional properties to enhance the CIDL; you can check them in the
[CIDL Specification](./specification)

## Imports
Through `imports`, we can support a new set of use cases. When importing another CIDL, we can reference other methods or types. Depending on the targeted blockchain, these references will behave differently, i.e., for Solana, a reference method will be a cross-program invocation call (CPI); check Solana CPI to learn more. To import other CIDLs we need to define them under the imports block as follow:

```yaml showLineNumbers
imports:
  - ref: another_cidl
    loc: ./another_cidl.yaml
```

`imports` is an array of objects where each object contains the following properties:

- `ref`: Is an alias for the import, this alias is used to reference the methods and types
- `loc`: Is where this CIDL is located, it can be FileSystem, GitHub, or the CIDL registry.

:::caution
Currently, `loc` only supports file system.
:::

## Data Types

The CIDL defines three forms of data types. A developer or organization can cover all available use cases through these.

:::info

Data types in the CIDL are all specified in lowercase, except for (custom) types.

:::

**Native Types:** These are primitive data types like `u32`, `bool`, `string`, etc. It is important to note that what is
a primitive type in the context of the CIDL may not be a primitive type in the transpile version.

**Extended Types:** Built-in extended types implemented by Código like `sol:pubkey`, `rs:option<t>`, and others. These
data types can be specific to a programming language, blockchain, or a particular form of handling them.

**Types:** These are the custom types defined by a developer.

### Native Data Types

The following table is a comprehensive list of the supported native type by the CIDL.

| Data Type | Length                             |
|-----------|------------------------------------|
| u8        | 8-bit unsigned integer             |
| u16       | 16-bit unsigned integer            |
| u32       | 32-bit unsigned integer            |
| u64       | 64-bit unsigned integer            |
| u128      | 128-bit unsigned integer           |
| u256      | 256-bit unsigned integer           |
| i8        | 8-bit signed integer               |
| i16       | 16-bit signed integer              |
| i32       | 32-bit signed integer              |
| i64       | 64-bit signed integer              |
| i128      | 128-bit signed integer             |
| i256      | 256-bit signed integer             |
| f32       | 32-bit signed float                |
| f64       | 64-bit signed float                |
| bool      | 1 bit                              |
| string    | Depends on the targeted blockchain |

### Extended Data Types

The following table is a comprehensive list of the supported extended type by the CIDL.

| Data Types         | Length                    | Comments                                                                                                                                                                            |
|--------------------|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sol:pubkey         | 32 bytes                  | Type specific to the Solana blockchain. Transpiles to [Pubkey](https://docs.rs/solana-program/1.15.2/solana_program/pubkey/struct.Pubkey.html) data type.                          |
| sol:account_info   | It depends                | Type specific to the Solana blockchain. Transpiles to [AccountInfo](https://docs.rs/solana-program/1.15.2/solana_program/account_info/struct.AccountInfo.html) data type.          |
| sol:merkle_tree | It depends | Type specific to the Solana blockchain. Transpiles to [AccountInfo](https://docs.rs/solana-program/1.15.2/solana_program/account_info/struct.AccountInfo.html) data type with the owner set to the account compression program.          |
| rs:option&lt;t&gt; | 1 bit + the length of t   | Type specific to Rust-based blockchain. Transpiles to [Option&lt;T&gt;](https://doc.rust-lang.org/std/option/enum.Option.html) where T can be any supported native type or sol:pubkey |
| rs:c_option&lt;t&gt; | 4 bytes + the length of t   | Type specific to Rust-based blockchain. Transpiles to [COption&lt;T&gt;](https://doc.rust-lang.org/std/option/enum.Option.html) where T can be any supported native type or sol:pubkey. This type is only intended to be used with the Solana SPL. |
| rs:vec&lt;t&gt;    | 4 bytes + the length of t | Type specific to Rust-based blockchain. Transpiles to [vec&lt;T&gt;](https://doc.rust-lang.org/std/vec/index.html) where T can be any supported native type or sol:pubkey          |

:::caution

`vec<string>` is still WIP; thus, it is unavailable for the public beta.

:::

### Types

Through `types`, developers can define their custom data structure. These custom data structures go under the `types`
object in the CIDL, for example:

```yaml showLineNumbers
types:
  CustomDataStructure:
    summary: My custom defined data structure
    fields:
      - name: first_field
        type: u32
        description: My first field
```

As you can see from the above example, the structure of a custom type has a simple form. The key of the `types` object
is the data structure's name; thus, it must follow the rules of the targeted programming language. As a recommendation,
the data structure's name should be in PascalCase for better readability.

:::info

Custom types must have at least **one** field.

:::

A custom data structure can define two basic properties, `summary` and `fields`. The `summary` is a recommended property
allowing developers to generate web-based documentation. We specify the properties of our custom data structure through
the' fields' property.

The `fields` is an array of objects, each defining the simple structure seen above. In detail:

- `name`: The field's name; must follow the rules of the targeted programming language.
- `type`: The field's data type; can be any supported native or extended type except for `sol:account_info` or other
  custom-defined data types.
- `description`: This recommended property enables developers to generate web-based documentation.

:::tip
You can define any number of data structures and fields required for your use case.
:::

:::caution
We cannot specify another custom type to the field’s type or the extended `sol:account_info` data type.
:::

That’s it. As simple as that, we can define a custom data structure. Now, via extension, we can expand the capabilities
of the type.

## Methods

Similar to `types`, defining methods have a simple structure. Through `methods`, developers can define their smart
contract instructions, for example:

```yaml showLineNumbers
methods:
  - name: my_first_instruction
    summary: This is my first instruction
      uses:
      - my_other_program.instruction_1
    inputs:
      - name: my_first_input
        type: CustomDataStructure
        description: Inputs are just parameters
      - name: my_second_input
        type: my_other_program.AnotherDataStructure
```

The `methods` section in the CIDL is an array of objects where each object is an instruction. An instruction object
comprises the following properties:

- `name`: The name of the smart contract instruction; must follow the rules of the targeted programming language.
- `summary`: This **recommended** property enables developers to generate web-based documentation.
- `uses`: Array of reference methods. The behavior varies per blockchain, for Solana, the methods defined in the `uses` property will be transpile to Solana CPI calls.
- `inputs`: The instruction parameters. `inputs` is an array of objects, where each object will be transpile to a
  parameter.

The input object also has a simple structure composed of the following properties:

- `name`:  Parameters’ name; must follow the naming rules of the targeted programming language.
- `type`: The parameters’ data type; can be any supported native, extended, custom data types, or referefence types
- `description`: This **recommended** property enables developers to generate web-based documentation.

:::info
We can specify any native, extended, or custom data type to the input type.
:::

Yet again, that’s it. As simple as that, we can define smart contract instructions. Now, through extension, we can
expand the capabilities of the instructions.

## Next Steps

**Congratulations!** 🎉👏 at this point, you should have a basic understanding of the structure of the CIDL. To summarize
what we learned:

- CIDL stands for Código’s Interface Description Language
- We need to specify some basic information about the contract
- CIDL supports native, extended, and custom-defined data types
- Custom-defined data types go under the object named `types`
- Smart contract instructions are defined under the array of objects named `methods`
- Methods inputs are just parameters
- It is **recommended** to specify summary and description whenever possible to generate the web-based documentation

These links may help you on your journey to writing smart contracts with the CIDL:

- [Solana Extension](./blockchain-extensions/solana)
- [Part I - Building Solana Programs](../guides/part-1-building-solana-programs.md)

### Join the Código community💚

Código is a growing community of developers. Join us on
**[Discord](https://docs.google.com/forms/d/e/1FAIpQLSdSG0OgJ5xuwwU7JiSGBdn01L3ID68qNCd2HAnFSztXVYKmBg/viewform)**
and **[GitHub](https://docs.google.com/forms/d/e/1FAIpQLSdGDGH4bwQf5dX3-uFCYeRKzIGbd5dVEPxHKQPTt63bBVVcVQ/viewform)**

#### Documentation detectives wanted! If you've spotted any gaps or have suggestions to level up our documentation game, we'd love to hear from you!

[![Button Example]][Link]
[Link]: https://docs.google.com/forms/d/e/1FAIpQLSf1fsM3eCRFzqO4w6IxJ-SDIVf_yTGit1Arr0PMB2EfnO3aRQ/viewform
[Button Example]: https://img.shields.io/badge/Feedback-FD971F?style=for-the-badge
