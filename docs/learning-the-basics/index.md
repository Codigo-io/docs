# CIDL

## Definition

The Código Interface Description Language (short: CIDL)  is a formal language used to describe the interface of a
blockchain smart contract. It can enable the expression and creation of programs of any level of complexity,
from a single contract to multi-contract applications. It can be accessed by other contracts or users. The CIDL
accelerates blockchain development and increases the security of the code.

Código's Interface Description Language (short: CIDL), is the main configuration file for your dApp projects. The CIDL
is written in YAML format; the file extension commonly is `.cidl`, but `.yaml` and `.yml` are supported. 

:::tip
The IDE assistance provided by Código only supports the `.cidl` extension
:::

In this section "Learning the basics", we will go through the basic structure of the CIDL. The CIDL learning curve is
minimal; the complexity
is defined by the complexity of the use case.

By good CIDL development practice is good to set the CIDL specification version as the first line of CIDL.

```yaml
cidl: 0.9
```

| Keyword | Type         | Optionality | Description                        |
|---------|--------------|-------------|------------------------------------|
| cidl    | Spec version | Required    | A valid CIDL specification version |

Check the [change logs](../whats-new.md) to get the latest spec version

## Next steps

Learn about the supported data types and how to modify/extend their behavior through attributes. If you
dominate these concepts, then you have mastered the CIDL.

- [Data Types](data-types)

## Join the Código community💚

Código is a growing community of developers. Join us on
**[Discord](https://discord.gg/8XHQGS832k)**
and **[GitHub](https://github.com/Codigo-io)**
