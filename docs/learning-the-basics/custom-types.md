# Types

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

A custom data structure can define two basic properties, `summary` and `fields`. The `summary` is a **recommended**
property
allowing developers to generate web-based documentation. We specify the properties of our custom data structure through
the fields' property.

The `fields` is an array of objects, each defining the simple structure seen above. In detail:

- `name`: The field's name; must follow the rules of the targeted programming language.
- `type`: The field's data type; can be any supported native or extended type except
  for `sol:account_info`, `sol:merkle_tree`, or other
  custom-defined data types.
- `description`: This **recommended** property enables developers to generate web-based documentation.

:::tip
You can define any number of data structures and fields required for your use case.
:::

:::caution
We cannot specify another custom type to the field’s type or the extended `sol:account_info` or `sol:merkle_tree` data
types.
:::

That’s it. As simple as that, we can define a custom data structure. Now, via extension, we can expand the capabilities
of the type.
