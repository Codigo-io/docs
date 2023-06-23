---
sidebar_position: 1
---

# Part I - Building Solana Programs

Solana is a blockchain platform that has been gaining significant traction due to its high-performance capabilities and
promise of fast, cheap, and secure transactions. However, the learning curve for developing on Solana can be steep, and
navigating the platform's technical complexities can be challenging. Fortunately, using Código Interface Description
Language (CIDL) can make the development process much more manageable.

This guide will take you through the process step-by-step, from understanding CIDL syntax to creating, testing, and
deploying Solana programs. We'll cover everything you need to know to get started building high-performance blockchain
applications on Solana.

## Basic Solana

Before we dive into building on Solana, it's important to understand some basic Solana concepts. By covering these
foundational concepts upfront, we'll ensure you have the necessary knowledge to proceed confidently. If you already know
these basic concepts, you can jump directly to What are we building?

### Keypair

A Solana keypair is a pair of cryptographic keys consisting of public and private keys. The public key identifies the
owner of a Solana account, while the private key signs transactions and proves ownership of the account.

### Accounts

In Solana, an account is a data structure that can hold information and has a unique public key associated with it.
Accounts are crucial for storing and exchanging information on the network.

|                          ![AccountInfo](../../static/img/Accounts%20-%20Guide%201.png)                          |
|:---------------------------------------------------------------------------------------------------------------:|
| *For clarity, some data types of the AccountInfo fields were simplified.In Rust, [u8] represents a byte array.* |

### Program

Programs are responsible for interpreting the instructions sent inside each transaction. These programs are often
called "smart contracts" on other blockchains. In Solana, a program is an `AccountInfo` where the field `executable`
value is set to true. The program compile output, Berkeley Packet Filter (BPF), is stored in the data field.

:::info
We need to wrap our heads around that everything in Solana is an Account!
:::

### Program Derived Account, PDA

One of the main reasons Solana has gained significant traction is the power PDAs bring to building dApps. In the
simplest form, a PDA Account is an Account whose signing authority is a program. In other words, a PDA Account is owned
by a program, and only this program can sign on behalf of the PDA.

### Instructions

The smallest contiguous unit of execution logic in a program. An instruction specifies which program it is calling,
which accounts it wants to read or modify, and additional data that serves as an auxiliary input to the program.

| ![Account Meta and Instruction](../../static/img/Instructions%20-%20Guide%201.png) |
|:----------------------------------------------------------------------------------:|

### Transaction

While Instructions are the basic unit of computation in Solana, they are submitted by clients in Transactions containing
one or more instructions and signed by one or more Signers. Solana executes the instructions in a transaction in order
and only commits changes if all instructions terminate without producing an error or exception.

|                                           ![Transaction](../../static/img/Transaction%20-%20Guide%201.png)                                           |
|:----------------------------------------------------------------------------------------------------------------------------------------------------:|
| *Transactions do not directly contain their instructions but instead include a Message, a precompiled representation of a sequence of instructions.* |

With this minimum knowledge of Solana Basic, we can start writing Solana programs with the CIDL.

## What are we building?

We will build a straightforward blog system. The blog system is composed of the following entities:

| ![Blog System](../../static/img/Blog%20System-%20Guide%201.png) |
|:---------------------------------------------------------------:|

:::tip
Data types in the CIDL are all specified in lowercase
:::

:::info
In Solana, we need to pay for storage. This is called rent and is based on the account length.
:::

Let’s go into detail about each entity defined in the above diagram.

- `User` through this data structure, we will store the user information; a user can create or comment on posts:
    - `display_name` is the user’s name we will use to display who wrote the post or comment, with a capacity of 36
    - `posts` is a convenience field where we can easily track the number of posts the given author has written.
- `Post` with this data structure, we are going to store all the information related to a post:
    - `title` is the title of the blog post with a capacity of 96
    - `short_description` is the short description of the blog post with a capacity of 255
    - `feature_image_url` is an optional image URL that can be used as the thumbnail of the blog post with a capacity of
      96
    - `content_url` is the URL of where the body of the blog post will be stored. A blog post can be thousands of
      characters long; instead of paying for thousands of characters, we can spend less by defining it as a URL with a
      capacity of 96
    - `category` is the main category of the blog post, with a capacity of 36
    - `likes` is the number of likes this blog post has received
    - `dislikes` is the number of dislikes this blog post has received
    - `author` The user’s account public key; we can use this field to retrieve the account that wrote the post
- `Comments` Is a data structure that will be used to save a comment related to a post:
    - `content` The comment itself, with a capacity of 255
    - `user` The user’s account public key; we can use this field to retrieve the account that wrote the comment
    - `post` The post’s account public key; we can use this field to retrieve the post we wrote the comment for

## Our first 10 lines of CIDL code

You can follow along this guide by cloning the repo https://github.com/Codigo-io/examples

:::info
CIDL stands for Código Interface Description Language; through the CIDL, we can define our smart contracts interfaces.
:::

 ```yaml showLineNumbers
 types:
   User:
     summary: |
       Through this data structure, we will store the user information;
       a user can create or comment on posts
     fields:
       - name: display_name
         type: string
         solana:
           attributes: [ cap:36 ]
       - name: posts
         type: u16
```

**Congratulations!** You have written your first 10 lines of CIDL code. Within these 10 lines of code, we can deduct
more or less what is happening, but for now, let's focus on one of the core functionalities of the CIDL, extensions, and
then we can explore the rest.

### What is an Extension?

:::info
An extension in the CIDL is an object composed of multiple properties that can target a specific blockchain, framework,
or programming language. An extension can be defined in various places of the CIDL.
:::

One of the main features of Código Interface Description Language (CIDL) is that it is blockchain agnostic. It can
target multiple blockchains with 1 CIDL and minimum configurations through extension.

In the previous code, we defined a solana extension for the field named `display_name`. Within the field solana
extension, we defined the property `attributes`, `attributes` is an array of strings through which we can define the
capacity of `display_name` using the `cap` attribute. To learn more,
check [Solana Extension - Data Types](../código-interface-description-language/blockchain-extensions/solana/data-types.md).

:::tip
Any data structure defined in the CIDL that targets the Solana blockchain will be transpile to a Solana account. Solana
accounts must have a fixed length; thus, we need to specify the capacity of a string data type.
:::

### Unpacking the rest of the CIDL code

Now that we have defined one of the central core features of CIDL, let's take a moment to understand the rest of the
CIDL code, we just wrote. Doing so can give us a more comprehensive understanding of how this code works.

### The `types` map

Whenever we need to define a custom data structure, we define them in the `types` map. To learn more,
check [Learning the Basic - Types](../código-interface-description-language/learning-the-basics.md#types).

### The type `User`

Inside the `types` map, we defined a type named `User`.
This `User` [corresponds to the one defined above](#what-are-we-building).

A type defines a key-value pair. The key will be the data structure's name; thus, it must follow the naming rules for
the targeted programming language. The value is an object that defines 2 properties:

- `summary`: A recommended property where we can describe the purpose of the data structure. The summary content will be
  used to generate the web-based documentation.
- `fields`: The `fields` is an array of objects where we define the fields that compose the given type. A field defines
  2 main properties named `name` and `type` and then defines different extensions. To learn more,
  check [Learning the Basic - Types](../código-interface-description-language/learning-the-basics.md#types).
    - `name`: The field's name. The name must follow the rules of the targeted programming language.
    - `type`: Data type of the given field. To learn more,
      check [Learning the Basic - Native Data Types](../código-interface-description-language/learning-the-basics.md#native-data-types).

From the previous knowledge, we now can build the sentence on how to read the above code:

> Defines a data structure named User composed of 2 fields; the first is the display name of type string and the other
> posts of type u16.

### Security: Account ownership

Now, let's talk about another central core functionality of the CIDL, security.

The `AccountInfo` structure has a field named `owner`. The value of the `owner` field indicates the program that owns
the account. **Only the owning program is capable of modifying the account. **

The generated code always includes the ownership checks. An ownership check verifies that an account is owned by the
expected public key; without this check, malicious attackers can pass a similar account structure to your programs. Your
program will execute your business logic using an incorrect account, thus creating unwanted behavior.
Check [Solana Extension - Data Types - Types - Ownership](../código-interface-description-language/blockchain-extensions/solana/data-types.md#ownership)
to learn more.

### Security: Account length

Besides the account ownership verification, Código automatically generates the account length security check. This
security check will verify that everywhere an Account is used matches the account length. The account length is
determined by the fields’ data type plus their capacity for the string and vector data type.

## Challenge - Define the Post type

We encourage you to do the following challenge using the repository you cloned above:

> Define the `Post` data structure with the following fields:

- title of type `string`, capacity 96
- short_description of type `string`, capacity 255
- feature_image_url of type `rs:option<string>`, capacity 96
- content_url of type `string`, capacity 96
- category of type `string`, capacity 36
- likes of type `u32`
- dislikes of type` u32`
- author of type `sol:pubkey`

If you get stuck, check [Our first 10 lines of CIDL code](#our-first-10-lines-of-cidl-code) to gain insight into
completing the challenge.

<details>
    <summary>Click to see the solution</summary>

```yaml showLineNumbers
types:
  Posts:
    summary: Data structure to store all the related information of a post
    fields:
      - name: title
        type: string
        solana:
          attributes: [ cap:96 ]
      - name: short_description
        type: string
        solana:
          attributes: [ cap:255 ]
      - name: feature_image_url
        type: rs:option<string>
        solana:
          attributes: [ cap:96 ]
      - name: content_url
        type: string
        solana:
          attributes: [ cap:96 ]
      - name: category
        type: string
        solana:
          attributes: [ cap:36 ]
      - name: likes
        type: u32
      - name: dislikes
        type: u32
      - name: author
        type: sol:pubkey
```

</details>

## Converting Posts type to a PDA Account

Congratulations on completing the previous challenge! Now let's transform our `Post` Account to a PDA Account.

:::caution
Any data structure that doesn’t define seeds will be transpile to a Non-PDA Account.
:::

What is so special about PDA Accounts?

- PDA Accounts don’t have a private key associated with them; this is guaranteed by the runtime.
- Everything regarding a PDA Account is managed by the [program](#program). You can
  see it as a special place (on-chain) for a program to write data while guaranteeing security.

We need to provide different inputs to the solana runtime to create a PDA; one is called `seeds`. The seeds are
application-specific and must be carefully selected to uniquely derive accounts per application requirements. It is
common to use static strings and other pubkeys as seeds.

:::note
The seeds are hashed sequentially, which means that seeds [“abcdef”], [“abc”, “def”], and [“ab”, “cd”, “ef”] will all
result in the same PDA account. For seed schemes that are susceptible to this type of hash collision, a common remedy is
to insert separators between seeds, e.g., transforming [“abc”, “def”] into [“abc”, “-”, “def”].
:::

To make `Posts` transpile to a PDA Account, we need to specify the seeds' definition of this type. In the CIDL, we do
this by setting the solana extension to the type and then the seed's definition. In code, this looks like this:

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

The seeds definition is an array of object, where each object has the require property `name` and the optional
property `type`. To learn more about seeds,
check [Solana Extension - Types - Seeds](../código-interface-description-language/blockchain-extensions/solana/data-types.md#seeds).

For the `Posts` data structure, we define 3 seeds:

- The first seed is a static string with the value `post`
- The second seed is named user of type `sol:pubkey`. This public key will be the user’s account creating the blog post.
- The third seed is an index value; this will be based on the number of posts that the user has created.

:::note
If you follow along, update your Post data structure with the seed definition.
:::

### Security: Verify PDA seeds

For PDA Accounts, Código generates the verified PDA seeds security checks. Without this security check, an attacker can
pass valid PDA accounts but not the intended account you might expect, causing unwanted behavior.

## Challenge - Define the Comments type

We encourage you to do the following challenge using the repository you cloned above:

> Define the `Comments` data structure with the following fields and seeds.

- Seeds
    - comment
    - user of type `sol:pubkey`
    - post of type `sol:pubkey`
- Fields
    - content of type `string`, capacity 255
    - user of type `sol:pubkey`
    - post of type `sol:pubkey`

If you get stuck, check [Our first 10 lines of CIDL code](#our-first-10-lines-of-cidl-code)
and [Converting Posts to a PDA Account](#converting-posts-type-to-a-pda-account) to
gain insight into completing the challenge.

<details>
    <summary>Click to see the solution</summary>

```yaml showLineNumbers
types:
  Comments:
    summary: Is a data structure that will be used to save a comment related to a post
    solana:
      seeds:
        - name: comment
        - name: user
          type: sol:pubkey
        - name: post
          type: sol:pubkey
    fields:
      - name: content
        type: string
        solana:
          attributes: [ cap:255 ]
      - name: user
        type: sol:pubkey
      - name: post
        type: sol:pubkey
```

</details>

## Next steps

**Congratulations!** 🎉👏 at this point, you should have a basic understanding of defining PDA and Non-PDA accounts with
their corresponding fields. To summarize what we learned:

- Everything in Solana is an Account!
- We need to pay storage for our solana accounts; thus, we need to specify the capacity attribute for string and vector
  type
- We define Solana accounts in the CIDL within the `types` section.
- By default, the verified ownership is always generated
- If we don’t specify a seed definition to an account, the generator will treat it as a Non-PDA account

These links may help you on your journey to writing smart contracts with the CIDL:

- [Part II - Building Solana Programs](./part-2-building-solana-programs.md.md)
- [Learning the Basics](../código-interface-description-language/learning-the-basics.md)
- [Solana Extension](../código-interface-description-language/blockchain-extensions/solana)

### Join the Código community 💚

Código is a growing community of developers. Join us on
**[Discord](https://docs.google.com/forms/d/e/1FAIpQLSdSG0OgJ5xuwwU7JiSGBdn01L3ID68qNCd2HAnFSztXVYKmBg/viewform)**
and **[GitHub](https://docs.google.com/forms/d/e/1FAIpQLSdGDGH4bwQf5dX3-uFCYeRKzIGbd5dVEPxHKQPTt63bBVVcVQ/viewform)**

#### Documentation detectives wanted! If you've spotted any gaps or have suggestions to level up our documentation game, we'd love to hear from you!

[![Button Example]][Link]
[Link]: https://docs.google.com/forms/d/e/1FAIpQLSfuADoY909KJnV4xOnaI3QuhHkWz8LTE2QwgJN4BSQcZnQIzg/viewform
[Button Example]: https://img.shields.io/badge/Feedback-FD971F?style=for-the-badge