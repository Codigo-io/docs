# Methods

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
- `uses`: Array of reference methods. The behavior varies per blockchain, for Solana, the methods defined in the `uses`
  property will be transpile to Solana CPI calls. Reference methods take the form of `ref.method_name`, where ref is the
  value set in the [imports](#imports)
- `inputs`: The instruction parameters. `inputs` is an array of objects, where each object will be transpile to a
  parameter.

The input object also has a simple structure composed of the following properties:

- `name`:  Parameters’ name; must follow the naming rules of the targeted programming language.
- `type`: The parameters’ data type; can be any supported native, extended, custom data types, or reference types.
  Referenced types takes the form of `ref.type_name`, where ref is the value set in the [imports](#imports)
- `description`: This **recommended** property enables developers to generate web-based documentation.

:::info
We can specify any native, extended, or custom data type to the input type.
:::

Yet again, that’s it. As simple as that, we can define smart contract instructions. Now, through extension, we can
expand the capabilities of the instructions.
