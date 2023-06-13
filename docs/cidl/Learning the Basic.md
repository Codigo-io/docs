---
sidebar_position: 2
---

Codigo's Interface Description Language (short: CIDL), is the main configuration file for your dApp projects. Through the CIDL, we define the interface of a smart contract. The CIDL is written in YAML format; thus, the created file must have the .yaml or .yml file extension.

In this document, we will go through the basic structure of the CIDL. The CIDL learning curve is minimal; a slight complexity is introduced when working with the CIDL extensions.

:::caution Alert

An extension in the CIDL is an object composed of multiple properties that can target a specific blockchain, framework, or programming language. An extension can be defined in various places of the CIDL; learn more about **Blockchain Extensions(linktobeadded)**.

:::

If you want a more in-depth technical read on the structure and all the available properties, check the **[CIDL Specification](linktobeadded)**

## Basic Contract Information

Each CIDL file we create must define some basic information. These pieces of information will help other developers understand what the contract is about and will help our generators.

```
cidl: 0.8
info:
  name: my_contract_name
  title: My pretty contract name
  version: 0.0.1
  summary: What this contract is about
  license:
    name: Unlicensed
```

The above properties are the **required** or **recommended** properties that any CIDL needs as basic contract information. Let’s quickly go through each property:

- `cidl`: The version of the CIDLSpecification we are targeting.
- `name`: The contract’s name; must follow the convention of the targeted programming language.
- `title`: A pretty name to be used in the web-based documentation.
- `version`: The contract version, must follow the semantic versioning convention.
- `summary`: This recommended property enables developers to generate web-based documentation.
- `license.name`: The license’s name. This will be the license of the contract and SDK clients.

We can specify additional properties to enhance the CIDL; you can check them in the **[CIDL Specification](linktobeadded)**

## Data Types

The CIDL defines three forms of data types. A developer or organization can cover all available use cases through these.

:::info Alert

Data types in the CIDL are all specified in lowercase, except for (custom) types.

:::

**Native Types:** These are primitive data types like `u32`, `bool`, `string`, etc. It is important to note that what is a primitive type in the context of the CIDL may not be a primitive type in the transpile version.

**Extended Types:** Built-in extended types implemented by Codigo like `sol:pubkey`, `rs:option<t>`, and others. These data types can be specific to a programming language, blockchain, or a particular form of handling them.

**Types:** These are the custom types defined by a developer. 

### Native Data Types

The following table is a comprehensive list of the supported native type by the CIDL. 

| Data Type | Length |
| ---- | ---- |
| u8 | 8-bit unsigned integer |
| u16 | 16-bit unsigned integer |
| u32 | 32-bit unsigned integer |
| u64 | 64-bit unsigned integer |
| u128 | 128-bit unsigned integer |
| u256 | 256-bit unsigned integer |
| i8 | 8-bit signed integer |
| i16 | 16-bit signed integer |
| i32 | 32-bit signed integer |
| i64 | 64-bit signed integer |
| i128 | 128-bit signed integer |
| i256 | 256-bit signed integer |
| f32 | 32-bit signed float |
| f64 | 64-bit signed float |
| bool | 1 bit |
| string | Depends on the targeted blockchain |



