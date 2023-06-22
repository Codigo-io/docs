---
sidebar_position: 4
---

#  Creating the web-based documentation	
We all agree that an API with good documentation is easier to use. Código covers you on this topic too. Through [Código Studio](https://studio.codigo.ai), we can access the web-based documentation, allowing you and your colleagues to understand the smart contract.

In this guide, we will go through the various parts we can specify the information to generate the web-based documentation.

## General information

As a starting point, we want to tell ourselves, our colleagues, and our contract consumers the purpose of the contract, how to get support, and what they can or can’t do. All this information can be specified in the `info` block of the CIDL, for example

```
info:
  name: budget_tracker
  title: Budget Tracker
  version: 0.0.1
  summary: |-
    The purpose of this contract is to track the income and outcome of a given user. For this contract, we are going to 
    target the Solana blockchain. Thus, we define the data structure **Record** that will be transpile to a PDA Account 
    base on the seeds defined in the solana extension. In addition, the contract defines three methods, also known as 
    instruction; through this method, we add behavior.
    
    Some useful links:
    
      - [Blockchain Extensions](https://docs.codigo.ai)
      - [Learning the Basics](https://docs.codigo.ai/cidl/Learning%20the%20Basics)
      - [Building Solana Program with CIDL: A Comprehensive Guide Part I](https://docs.codigo.ai/guides/guide-1)
  contact:
    name: Código
    web: https://codigo.ai
    email: support@codigo.ai
    git: https://github.com/codigo-io/demo-budget-tracker
  license:
    name: MIT
    url: https://opensource.org/license/mit
```

Most of the documentation properties are **recommended**, but the required one is `title`, `version` and `license`. The license requires the `name` and the mutable exclusively properties `url` or `identifier` where `identifier` is an SPDX license expression. We can view the above information in the web-based documentation:

| ![Budget Tracker Web Documentation](../../static/img/Budget%20Tracker%20Web%20Documentation.png) |
| :----------------------------------------------------------------------------------------------- |

In the web-based documentation, `contact` and `license` information are in the same section. The `web` URL will be the hyperlink for the developer/organization’s name when specified. The `summary` property supports markdown; thus, you can use markdown to describe your smart contract information clearly. 

## Types documentation
We all have been there; we defined a data type and forgot its purpose. The web-based documentation puts types at the center of the documentation to easily remind us which types we have defined and their purpose. 

For any type, we can define the summary of it, and for each field of the type, we can specify a description. With these two properties, we can enhance the documentation of a type. For example

```
types:
  Record:
    summary: Through this data structure we will stored the relevant information to track the income and outcome of a given user.
    solana:
      owner: self
      seeds:
        - name: record
        - name: signer
          type: sol:pubkey
    fields:
      - name: name
        type: string
        solana:
          attributes: [ cap:50 ]
        description: The name of the user.
      - name: moves
        type: u16
        description: Number incomes/outcomes registered.
      - name: outcome
        type: u32
        description: Sum of all outcomes.
      - name: income
        type: u32
        description: Sum of all incomes.
      - name: total_balance
        type: i64
        description: The current balance of the user
```

Regardless of specifying the **recommended** `summary` or `description` properties, the documentation for a type will be generated. We can view the above information in the web-based documentation:

| ![Types](../../static/img/Types%20web%20documentation.png) |
| :--------------------------------------------------------- |

If we specify the solana extension to the type, the information will be displayed in the web-based documentation. To learn more about Solana Extension, click the [link](https://docs.codigo.ai/cidl/Blockchain%20Extensions/Solana/). The `summary` property supports markdown; thus, you can use **markdown** to describe the information about your type clearly. Finally, a zoom-in to an individual field:

| ![Field](../../static/img/Field%20web%20documentation.png) |
| :--------------------------------------------------------- |

The field also supports the Solana Extension. To learn more about Solana Extension, click the [link](https://docs.codigo.ai/cidl/Blockchain%20Extensions/Solana/). The `description` property supports **markdown**; thus, you can use markdown to describe the information about your field clearly. Additionally, you can hover over the field’s data type to get more information about it.

## Methods documentation

Writing documentation for our methods helps our colleagues, end-users who will consume the smart contract, and ourselves understand what a method does and how to use it. Similar to types, we can define `summary` and `description` information in our methods; these properties are **recommended**. For example

```
methods:
  - name: create_user_record
    summary: To call once per account. Initialize a Record account. The total total_balance of the account will be set to 0.
    solana:
      signers:
        - name: fee_payer
        - name: company_account
          address: 2SVR8inD9PjWMvAgAyCYxE49nUnG5GjXtRWRGow61ArC
        - name: parent
          executable: true
    inputs:
      - name: user_record
        type: Record
        solana:
          attributes: [ mut, init_if_needed ]
      - name: user_name
        type: string
        description: The username to be assigned to the Record.name property
```

Regardless of specifying the **recommended** `summary` or `description` properties, the documentation for a method will be generated. We can view the above information in the web-based documentation:

| ![Method](../../static/img/Methods%20web%20documentation.png) |
| :------------------------------------------------------------ |

If we specify the solana extension to the method, the information will be displayed in the web-based documentation. To learn more about Solana Extension, click the link. The `summary` property supports **markdown**; thus, you can use markdown to describe the information about your method clearly. Finally, a zoom-in to an individual input:

| ![Input](../../static/img/Input%20web%20documentation.png) |
| :--------------------------------------------------------- |

The input also supports the Solana Extension. To learn more about Solana Extension, click the link. The `description` property supports **markdown**; thus, you can use markdown to describe your input's information clearly. Additionally, you can hover over the field’s data type to get more information about it. No description was specified for the `user_record` input for this example.

## Next steps
**Congratulations!** 🎉👏 at this point, you should have a basic understanding of writing documentation for your CIDL. To summarize what we learned:

- `summary` and `description` are **recommended** properties.
- The `title`, `version,` and `license` is the minimum required general information.
- We can specify `summary` and `description` information to types and methods
- The web-based documentation will be generated regardless if you specify `summary` and `description` information.

These links may help you on your journey to writing smart contracts with the CIDL:
- [Learning the Basic](https://docs.codigo.ai/cidl/Learning%20the%20Basics)
- [Solana Extension](https://docs.codigo.ai/cidl/Blockchain%20Extensions/Solana/)
- [Building Solana Programs with CIDL: A Comprehensive Guide Part I](https://docs.codigo.ai/guides/guide-1)

### Join the Código community 💚
Código is a growing community of developers. Join us on **[Discord](https://docs.google.com/forms/d/e/1FAIpQLSdSG0OgJ5xuwwU7JiSGBdn01L3ID68qNCd2HAnFSztXVYKmBg/viewform)** and **[GitHub](https://docs.google.com/forms/d/e/1FAIpQLSdGDGH4bwQf5dX3-uFCYeRKzIGbd5dVEPxHKQPTt63bBVVcVQ/viewform)** 

#### Documentation detectives wanted! If you've spotted any gaps or have suggestions to level up our documentation game, we'd love to hear from you!
[![Button Example]][Link]
[Link]: https://docs.google.com/forms/d/e/1FAIpQLSfZAyaTl_JDQRGWZUVTdl2ubbV7m0W7rEPktAHIOgnPf3eNQw/viewform
[Button Example]: https://img.shields.io/badge/Feedback-FD971F?style=for-the-badge