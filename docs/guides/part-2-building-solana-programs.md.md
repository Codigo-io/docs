---
sidebar_position: 2
---

# Part II - Building Solana Programs

In the first part of this guide, we learned some basic Solana concepts, described what we are building, and how to
define Solana Accounts in the CIDL. If you need a refresher on those concepts or don’t know what a Solana instruction,
transaction, or signer is, please check
the [Part I - Building Solana Programs](./part-1-building-solana-programs.md).

This second part will focus on defining the program methods. We add behavior to our program through methods. Methods
will be transpile to Solana’s instructions. We can define an instruction within the `methods` array of objects.

## Our first method

The first method we define is `create_user_account`; this method will be used to initialize the User account.

```yaml showLineNumbers
methods:
  - name: create_user_account
    summary: Method used to initialize the User account.
    inputs:
      - name: user
        type: User
        solana:
          attributes: [ init ]
      - name: display_name
        type: string
```

**Congratulations** on writing your first method!

### Method’s structure

The methods object is composed of the required `name` property, a list of `inputs`, and the recommended
property `summary`. Besides those properties, we can define different extensions. To learn more about the method’s
structure, read [Learning the Basic - Methods](../código-interface-description-language/learning-the-basics.md#methods).

In the first input named `user`, we can see a solana extension. If we remember the definition of extension from the last
doc:

> An extension in the CIDL is an object composed of multiple properties that can target a specific blockchain,
> framework, or programming language.

Through the solana extension, we define the attribute `init`. This attributes will make the `User` account writable and
generate all the code to create the account. To learn more about the solana extension within inputs,
read [Solana Extension - Methods - Inputs](../código-interface-description-language/blockchain-extensions/solana/methods.md#inputs).

:::tip
Before using an Account, we need to create it within the blockchain. The `init` attribute generates all the code that
tells the blockchain to create the account. To learn more about the solana `init` behavior,
read [Solana Extension - Methods - Inputs init attribute](../código-interface-description-language/blockchain-extensions/solana/methods.md#init).
:::

:::info
The specified attributes for the input-named `user` will only apply to the method `create_user_account`
:::

From the previous knowledge, we now can build the sentence on how to read the above code:

> Defines a method named create user record composed of 2 inputs; the first is the user of type User, and the other
> display name of type string.

### Security: Verify signers

As mentioned in Part I of this guide, transactions require one or more signers. The above
instruction, `create_user_account`, can only be used within a transaction. Código generators will add the minimum
signer, commonly known as “fee payer”, but also it will add the User account as a signer because we specify the `init`
attribute.

From the above information, Código will generate the verified signers check. This check will verify that the expected
accounts are signers. Malicious individuals can apply various vector attacks to hack your accounts without this check.
Check [Security - Solana](../security/solana.md#verify-signers) to learn more.

## Challenge - Define the method to create Posts account

We encourage you to do the following challenge using the repository you cloned from Part I:

> Define the method named `create_posts_account`. With the following inputs:

- post of type `Posts`, attributes `init`
- title of type `string`
- short_description of type `string`
- feature_image_url of type `rs:option<string>`
- content_url of type `string`
- category of type `string`
- author of type `sol:pubkey`

If you get stuck, check [Our first method](#our-first-method) to gain insight into
completing the challenge.

<details>
<summary>Solution</summary>

```yaml showLineNumbers
methods:
  - name: create_posts_account
    summary: Method used to initialize a Posts account.
    inputs:
      - name: post
        type: Posts
        solana:
          attributes: [ init ]
      - name: title
        type: string
      - name: short_description
        type: string
      - name: feature_image_url
        type: rs:option&lt;string&gt;
      - name: content_url
        type: string
      - name: category
        type: string
      - name: author
        type: sol:pubkey
```

</details>

## Linking inputs to account’s seeds

Congratulations on completing the previous challenge!

Now let's learn how we can link inputs to seeds. If we remember the structure of `Posts`, `Posts` will be transpile to a
PDA Account because of the seed definition:

```yaml showLineNumbers
types:
  Posts:
    solana:
      seeds:
        - name: post
        - name: user
          type: sol:pubkey
        - name: index
          type: u16
```

`Posts` defines a static seed with the value of `post` and two dynamic seeds. These two dynamics seeds must be sent when
creating the account. Código generators will automatically add the required seeds inputs to the client libraries. But we
want to guarantee that the value for the seed-named `user` is a public key belonging to a User account; how can we do
this?

First, we add a new input of type User to the input list of the method `create_posts_account`:

```yaml showLineNumbers
methods:
  - name: create_posts_account
    inputs:
      # We added the input of type User before the Posts type
      - name: author
        type: User
      - name: post
        type: Posts
        solana:
          attributes: [ init ]
```

Secondary, we link the input named author to the Posts’ owner seed, we do this by defining the `seeds` property in the
solana extension for the `post` input:

```yaml showLineNumbers
methods:
  - name: create_posts_account
    inputs:
      - name: author
        type: User
      - name: post
        type: Posts
        solana:
          attributes: [ mut, init ]
          # Link the author input to the seed-named user
          seeds:
            user: author
```

To learn more about seeds linking,
read [Solana Extension - Methods - Inputs' seeds](../código-interface-description-language/blockchain-extensions/solana/methods.md#seeds).

## Challenge - Define the method to create Comment account

We encourage you to do the following challenge using the repository you cloned from Part I:

> Define the method named `create_comment_account`. With the following inputs

- comment of type `Comments`, attributes `init` and seeds `user` and `post` linked to there corresponding
  input
- user of type `User`
- post of type `Post`
- content of type `string`

If you get stuck, check [Our first method](#our-first-method) to gain insight into completing the challenge.

<details>
<summary>Solution</summary>

```yaml showLineNumbers
methods:
  - name: create_comment_account
    inputs:
      - name: comment
        type: Comments
        solana:
          attributes: [ init ]
          seeds:
            user: user
            post: post
      - name: user
        type: User
      - name: post
        type: Posts
      - name: content
        type: string
```

</details>

## Next steps

**Congratulations!** 🎉👏 at this point, you should have a basic understanding of defining methods and linking inputs to
the PDA Account’s seeds. To summarize what we learned:

- Through methods, we define the instruction of the smart contract.
- Código Generators add the verified signers' security check to each method.
- Specifying the `init` attribute generates all the code to initialize an account.
- We can link inputs to PDA Account’s seeds.

These links may help you on your journey to writing smart contracts with the CIDL:

- [Part III - Building Solana Programs](./part-3-building-solana-programs.md)
- [Learning the Basic](../código-interface-description-language/learning-the-basics.md)
- [Solana Extension - Methods](../código-interface-description-language/blockchain-extensions/solana/methods.md)

## Join the Código community 💚

Código is a growing community of developers. Join us on
**[Discord](https://discord.gg/8XHQGS832k)**
and **[GitHub](https://github.com/Codigo-io)**

#### Documentation detectives wanted! If you've spotted any gaps or have suggestions to level up our documentation game, we'd love to hear from you!

[![Button Example]][Link]
[Link]: https://docs.google.com/forms/d/e/1FAIpQLSfqG2o2T9DChHHZdw23No_FbRhHuPiJ7ZdcdX3Se1u2WifpyA/viewform
[Button Example]: https://img.shields.io/badge/Feedback-FD971F?style=for-the-badge