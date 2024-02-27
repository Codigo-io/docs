---
sidebar_position: 3
---

# What's new

## v0.2.0

We have heard your feedback, and have adjusted accordingly. This release focuses on increasing the CIDL usability,
reducing verbosity, expanding the supported use cases, and setting the basis for future new cases i.e. pass data
structure as inputs, enums, and more.

> Until we hit GA, the releases will not be backward compatible. Thus, this release contains breaking changes.

### Highlights

#### Changed how solana accounts are defined

Previously solana accounts were inferred based on (custom-defined) types, each custom data type when targeting the
solana blockchain will be generated as an account. If the type defined the solana extension with seeds, this type will
be generated as a PDA account.

Now solana accounts are defined as `sol:account<T, K>` where T is an optional custom-defined type (also known as layout)
and K is an optional solana seeds definition (see next two sections). Now with this way of specifying accounts, we can
define PDA accounts without layout by specifying the underscore `_` to the T of `sol:account<T, K>`.

Example

```yaml showLineNumbers
solana:
  seeds:
    MySeedName:
      items:
        - name: static
        - name: dynamic
          type: u8
methods:
  - name: simple_method
    inputs:
      - name: pda_account_without_layout
        type: sol:account<_, seeds.MySeedName>
```

#### Added solana extension to the root of the CIDL

This new object can optionally be defined at the root of the CIL. Through this object, we can define `seeds`.

```yaml showLineNumbers
solana:
  seeds:
    SeedName:
    # ...
```

#### Changed how solana seeds are defined

Previously we defined seeds at the (custom-defined) type level. This had several issues i.e. we had to duplicate the
entire data structure to have 2 or more PDA accounts with the same layout, it was a blocker to allow data structure as
input, and didn't allow PDA accounts without layout.

Now at the solana root extension within the seeds, we can define seeds definitions, these definitions can then be
referenced when defining a solana account.

Example:

```yaml showLineNumbers
solana:
  seeds:
    MySeedName:
      items:
        - name: static
        - name: dynamic
          type: u8
types:
  MyType:
    fields:
      - name: state
        type: u8
methods:
  - name: simple_method
    inputs:
      - name: pda_account
        type: sol:account<MyType, seeds.MySeedName>
```

#### Made it clear when a value is assigned to an attribute

In multiple attributes like the `cap`, we used to assign a value using the colon i.e. `cap:36`. This was confusing since
we used the colon to prefix extended data types, and for some users, it wasn't obvious what was happening. We have
replaced the colon with the equal sign `=`, now for attributes that require or can have a value, will be assigned with
the equal sign i.e `cap=36`

#### Removed solana extension from fields

Previously, the only possible attribute for a field was the `cap`, this attribute only applied to `string`
and `rs:vec<t>`. It was cumbersome to be defining the solana extension and an indentation level to define the cap
attribute. Now the attribute property is at the field level.

Example:

```yaml showLineNumbers
fields:
  - name: my_field_name
    type: string
    attributes: [ cap=36 ]
```

#### Removed solana extension from input

One of the more verbose places in the CIDL was the solana extension for input. We have remove the solana input's
extension! Now each property that was possible to define in the extension can be defined as an attribute of the input;
now, the attribute property is at the input's level.

Example:

```yaml showLineNumbers
methods:
  - name: simple_method
    inputs:
      - name: account
        type: sol:account
        attributes: [ sol:init ]
```

#### Changed how inputs can be linked to PDAs' seed

Previously to link an input or a signer, to a PDA seed we had to define the solana extension and within the solana
extension define the seed objects and map it based on key-value, where the key of the object was the name of the seed
and the value was the name of an input, this was confusing and could cause error easily.

Now when we specify the seed definition to an account in parentheses we can link the input or signer to the seed in a
parameter name style.

```yaml showLineNumbers
solana:
  seeds:
    MySeedName:
      items:
        - name: owner
          type: sol:pubkey
        - name: id
          type: u64
methods:
  - name: simple_method
    signers:
      - name: delegate
        type: sol:account
    inputs:
      - name: pda_account
        type: sol:account<MyType, seeds.MySeedName(id=index, owner=delegate)>
      - name: index
        type: u64
```

#### Removed solana extension from types

Previously we were able to define the solana extension at the custom-defined type level. Through this extension, we were
able to define the owner of the account, if the type was compressed, and the definition of the seed.

Now, this extension no longer exists. Seeds are defined as described above, the owner is defined with
the `sol:owner=SomePubkey` attribute, and the type to compress is defined at the method's solana extension (see next
section).

#### Restructure solana method extension

Previously through the solana method's extension, we were able to define the `signers`, this has been moved to the
method's level (see next section).

Now at the solana method's extension, we can define the types that we want to compress with solana state compression.
Thus, also modifying how to specify a type was determined to be compressed.

Example:

```yaml showLineNumbers
types:
  Article:
    fields:
      - name: title
        type: string
        attributes: [ cap=96 ]
methods:
  - name: simple_method
    solana:
      compress:
        - type: Article
          mode: append
```

#### Change how signers are defined

Previously we defined the `signers` at the solana method's extension and linked an input to a signer by name.

Now the `signers` have been moved to the method's level. And the linkage from a signer to an input has been redefined
with an explicit property name `input`.

Example:

```yaml showLineNumbers
methods:
  - name: simple_method
    signers:
      - name: fee_payer
        type: sol:account
      - input: delegate
    inputs:
      - name: delegate
        type: sol:account
```

#### Updated generated Anchor program to v0.29.0

We have made a lot of improvements to our Anchor-generated code. Have improved the generated code, fixed a lot of bugs,
expanded supported use cases to the native level (SPL and State compression are still in the work), and generated Anchor
with the latest version v0.29.0 with multiple files template.

#### Improved error messaging

Previously, the validation error messages were obscure, not friendly, and non-informative.

Example v0.1.0 (Previous version):

```yaml showLineNumbers
- name: fee
  type: 
```

Error message:

```shell
unmarshal error the data type u9 is not a primitive, extended, user-defined or imported type.
```

Example v0.2.0 (Current version):

```yaml showLineNumbers
- name: fee
  type: 
```

Error message:

```shell
Trace: /path/yo/your/file.cidl:43:15
Code: C-TYPE0012
SyntaxError: The data type "u9" is not supported for type's fields'

```

We can notice that the error message contains a code. From now on, all error messages will be coded and will be
documented in our https://docs.codigo.ai

### General

- Rename `sol:account_info` data type to `sol:account`
- Change `rs:vec<t>` for `array<t>`
- Change `rs:option<t>` for `?` operator. The operator must be specified as a suffix to the type
- Added `u64` and `i64` support to seeds' type
- Swap `rent-payer` property from the input's solana extension for the `sol:rent-payer=` attribute
- Swap `rent-receiver` property from the input's solana extension for the `sol:rent-receiver=` attribute
- Change `owner` attribute name to `sol:owner`
- Change `space` attribute name to `sol:space`
- Change `authority` attribute name to `sol:authority`
- Change `address` attribute name to `sol:address`
- Change `canopy` attribute name to `sol:canopy`
- Change `mut` attribute name to `sol:writable`
- Change `close` attribute name to `sol:close`
- Change `init` attribute name to `sol:init`
- Change `init_if_needed` attribute name to `sol:init_if_needed`
- Added `sol:close_uncheck` attribute. The difference from `sol:close` is that the latter forces the non-pda account to
  be a signer, and the first doesn't
- Added `sol:c_option` attribute and remove the `rs:c_option` extended data type
- Added `sol:uncheck_account` attribute. Doesn't generate security checks
- Fix https://github.com/Codigo-io/platform/issues/6
- Fix https://github.com/Codigo-io/platform/issues/19
- Fix https://github.com/Codigo-io/platform/issues/52
- Fix https://github.com/Codigo-io/platform/issues/55
- Fix https://github.com/Codigo-io/platform/issues/96

## v0.1.0

### General

- CIDL imports. Compose your CIDLs with other CIDLs implemented by Código or the Community.
- Restructure the generated native program and client projects for better readability and maintainability.
- Improve the Código CLI
    - Added flags to overwrite the default location for the generated program and program client
    - Added flags only to generate the program or the client
- Added the Anchor CLI to Código Studio
- Downloadable CLI. Now, you can download Código CLI to work from your local environment.

### Solana

- Anchor support was one of the most requested features during the private beta. We are glad to inform you that now you
  can generate 100% of the boilerplate code for the program and client libraries using the Anchor framework.
- Expanded the supported use cases by adding support for cross-program invocation (CPI) of depth-1.
- Solana has done a fantastic job helping the community reduce blockchain fees; thus, this release introduces state
  compression support.

Download: https://github.com/Codigo-io/platform/releases/tag/v0.1.0

## Join the Código community 💚

Código is a growing community of developers. Join us on
**[Discord](https://discord.gg/8XHQGS832k)**
and **[GitHub](https://github.com/Codigo-io)**