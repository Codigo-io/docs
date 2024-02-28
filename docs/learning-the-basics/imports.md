# Imports

Through `imports`, we can support a new set of use cases. When importing another CIDL, we can reference other methods or
types. Depending on the targeted blockchain, these references will behave differently, i.e., for Solana, a reference
method will be a cross-program invocation call (CPI); check Solana CPI to learn more. To import other CIDLs we need to
define them under the imports block as follow:

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
