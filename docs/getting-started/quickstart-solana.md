# Solana

Solana is a blockchain built for mass adoption. It's a high performance network that is utilized for a range of use
cases, including finance, NFTs, payments, and gaming. Solana operates as a single global state machine, and is open,
interoperable and decentralized.

The learning curve for developing on Solana can be steep, and navigating the platform's technical complexities
can be challenging. Fortunately, using Código Interface Description Language (CIDL) can make the development process
much more manageable.

:::tip
We can develop on Solana using what is called Solana native/vanilla or the Anchor Framework.
**With Código AI generator, we can generate Solana native or Anchor code.**
:::

Before we dive into building on Solana, it's important to understand some basic Solana concepts. By covering these
foundational concepts upfront, we'll ensure you have the necessary knowledge to proceed confidently. If you already know
these basic concepts, you can jump directly to the quickstart on building [Native Program](quickstart-solana-native) or
[Anchor Program](quickstart-solana-anchor)

## Keypair

A Solana keypair is a pair of cryptographic keys consisting of public and private keys. The public key identifies the
owner of a Solana account, while the private key signs transactions and proves ownership of the account.

## Accounts

In Solana, an account is a data structure that can hold information and has a unique public key associated with it.
Accounts are crucial for storing and exchanging information on the network.

|                          ![AccountInfo](../../static/img/Accounts%20-%20Guide%201.png)                          |
|:---------------------------------------------------------------------------------------------------------------:|
| *For clarity, some data types of the AccountInfo fields were simplified.In Rust, [u8] represents a byte array.* |

## Program

Programs are responsible for interpreting the instructions sent inside each transaction. These programs are often
called "smart contracts" on other blockchains. In Solana, a program is an `AccountInfo` where the field `executable`
value is set to true. The program compile output, Berkeley Packet Filter (BPF), is stored in the data field.

:::info
We need to wrap our heads around that everything in Solana is an Account!
:::

## Program Derived Account, PDA

One of the main reasons Solana has gained significant traction is the power PDAs bring to building dApps. In the
simplest form, a PDA Account is an Account whose signing authority is a program. In other words, a PDA Account is owned
by a program, and only this program can sign on behalf of the PDA.

## Instructions

The smallest contiguous unit of execution logic in a program. An instruction specifies which program it is calling,
which accounts it wants to read or modify, and additional data that serves as an auxiliary input to the program.

| ![Account Meta and Instruction](../../static/img/Instructions%20-%20Guide%201.png) |
|:----------------------------------------------------------------------------------:|

## Transaction

While Instructions are the basic unit of computation in Solana, they are submitted by clients in Transactions containing
one or more instructions and signed by one or more Signers. Solana executes the instructions in a transaction in order
and only commits changes if all instructions terminate without producing an error or exception.

|                                           ![Transaction](../../static/img/Transaction%20-%20Guide%201.png)                                           |
|:----------------------------------------------------------------------------------------------------------------------------------------------------:|
| *Transactions do not directly contain their instructions but instead include a Message, a precompiled representation of a sequence of instructions.* |

## Next steps

With this minimum knowledge of Solana Basic, we can start writing Solana programs with the CIDL.

- [Native Program](quickstart-solana-native)
- [Anchor Program](quickstart-solana-anchor)

## Join the Código community 💚

Código is a growing community of developers. Join us on
**[Discord](https://discord.gg/8XHQGS832k)**
and **[GitHub](https://github.com/Codigo-io)**
