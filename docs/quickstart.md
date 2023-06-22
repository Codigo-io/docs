---
sidebar_position: 2
---
# Quickstart

In this Quickstart guide, you’ll learn how to start with Código’s Interface Description Language (CIDL) from scratch using our web-based IDE, **[Codigo Studio](https://studio.codigo.ai)**. Código Studio has all the necessary tools and programs to develop using the CIDL.

After completing this QuickStart, you should have a basic understanding of the CIDL structure, how to execute Código’s AI Generator, implement the smart contract business logic, and integrate the generated TypeScript client library. For this guide, we will target the Solana blockchain.

**Let’s get started!**

## 1. Define the smart contract interface

Open **[Código Studio](https://studio.codigo.ai)**

:::info
Código Studio requires the developers to identify with their pre-created user for the private beta. You should have received your credentials via email if you are a private beta developer. If you have issues accessing Código Studio, don't hesitate to contact us at support@codigo.ai or via the Telegram Group.
:::

When you first open Código Studio, you will see in the explorer a file called `cidl.yaml` with the following content:

```yaml
cidl: "0.8"
info:
  name: budget_tracker
  title: Código QuickStart
  version: 0.0.1
  summary: |-
    Código is an AI-Powered Code Generation Platform for blockchain developers and web3 teams that saves development 
    time and increases the code's security across various blockchains.

    Código's AI Generator input is the Código Interface Description Language (CIDL for short). 
    Through the CIDL, we define the interface of the smart contract.

    In this QuickStart, we will learn the basic structure of the CIDL, how to execute Código's AI Generator, 
    implement the smart contract business logic, and integrate it with the generated TypeScript client library. 
    For this QuickStart, we will target the Solana blockchain.

    _Let's get started!_

    Some useful links:

    - [QuickStart](https://docs.codigo.ai)
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
      # TODO: 1 - Complete the definition of the Record data structure
      # Add the following fields
      #   - moves of type u16
      #   - outcome of type u32
      #   - income of type u32
      #   - total_balance of type i64
methods:
  - name: create_user_record
    summary: To call once per account. Initialize a Record account. The total total_balance of the account will be set to 0.
    inputs:
      - name: user_record
        type: Record
        solana:
          attributes: [ mut, init_if_needed ]
      - name: user_name
        type: string
        description: The username to be assigned to the Record.name property

  # TODO: 2 - Define the register_income method
  #  - Add the following inputs
  #  - record of type Record, and the attribute mut
  #  - amount of type u32

  # TODO: 3 - Define the register_outcome method
  #  - Add the following inputs
  #  - record of type Record, and the attribute mut
  #  - amount of type u32
```

The CIDL contains three TODOs for you to complete. But before you start working on the TODOS, let's talk about some CIDL basics.

- The CIDL is the input for Código’s AI Generator. We use the CIDL to define the interfaces of a smart contract.
- The generator requires some general information about the contract; we define these data in the `info` section.
- The `methods` are the instructions of the smart contract; through the methods, we add behavior.
- We can define custom data structure; this can be done within the `types` object.
- The CIDL is blockchain agnostic. With one CIDL, we can target multiple blockchains. For this QuickStart, we targeted the Solana Blockchain.
- We can extend the capabilities of a type, field, method, and input through extensions. Because we are targeting the Solana Blockchain, we define the solana extension in various places of the CIDL.

With this basic knowledge and the description for each TODO, you should be able to complete them. 

**Happy Coding!**

<details>
  <summary>Solution: Complete the definition of the Record data structure</summary>

```yaml
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
</details>

<details>
  <summary>Solution: Define the register_income method</summary>

```yaml
- name: register_income
  summary: Register the given amount as an income for the given record account. The total total_balance of the account will be increased.
  inputs:
    - name: user_record
      type: Record
      solana:
      attributes: [ mut ]
    - name: amount
      type: u32
      description: The amount to be registered as the income.
```
</details>

<details>
  <summary>Solution: Define the register_outcome method</summary>

```yaml
- name: register_outcome
  summary: Register the given amount as an outcome for the given record account. The total total_balance of the account will be decreased.
  inputs:
    - name: user_record
      type: Record
      description: The user record account
      solana:
      attributes: [ mut ]
    - name: amount
      type: u32
      description: Number to be added to the outcome accumulator
```
</details>

## 2. Execute Código AI Generator

Congratulations on completing the TODOs. With the CIDL completed, we can generate the smart contract and TypeScript library. For that, open a new terminal; Terminal -> New Terminal

| ![New Terminal](../static/img/New_Terminal-CodigoStudio.png) |
| :-------------------------------------------------: |
|                 *New Terminal*           |

Type the following command to execute the generator: `codigo generate cidl.yaml`

When it completes generating the code, you will see three new directories in the explorer as follows:

| ![Directories](../static/img/Directories-CodigoStudio.png) |
| :-------------------------------------------------: |
|                 *Directories*           |

- `codigolib` this directory contains all security verification and serialization/deserialization utils with corresponding test cases.
- `generated` this directory contains all the files for a native solana contract and the stubs where we will implement the business logic.
- `sdk` this directory will contain all the files for the TypeScript client library. 

## 3. Implement the business logic

When we expand the `generated` directory, we will see numerous files corresponding to a native solana smart contract; we don’t need to change anything on these files; thus, we can ignore them. The files we are interested in and where we will implement the business logic are inside the `stub` directory.

| ![Stub Directory](../static/img/Directories-CodigoStudio.png) |
| :-------------------------------------------------: |
|                 *Stub Directory*           |

If we open one of those files, we will see a function with the same name as the file. Each file corresponds to a method defined in the CIDL. Inside each file, we can see a function where we will be implementing the business logic, the parameters of the function are determined by the inputs define for the method in the CIDL. 

### 3.1 Implement create_user_record

Open the file `generated/rendered/stubs/create_user_record.rs` and replace the comment `// Place your custom code here…` with the following line:

```rust
user_record.data.name = user_name;
```
### 3.2 Implement register_income

Open the file `generated/rendered/stubs/register_income.rs` and replace the comment `// Place your custom code here…` with the following line:

```rust
user_record.data.moves += 1;
user_record.data.income += amount;
user_record.data.total_balance += amount as i64;
```

### 3.3 Implement register_outcome

Open the file `generated/rendered/stubs/register_outcome.rs` and replace the comment `// Place your custom code here…` with the following line:

```rust
user_record.data.moves += 1;
user_record.data.outcome += amount;
user_record.data.total_balance -= amount as i64;
```

Congratulations! After implementing seven lines of business logic code, you have a secure working solana contract. The next step is to build and deploy it!

## 4. Build and deploy the smart contract
Código Studio comes with all the tools and programs for building and deploying smart contracts.

First, let’s build the contract. Open a new terminal by going to Terminal -> New Terminal. Navigate to the generated directory by typing the command `cd generated`, and inside the `generated` directory, type the following command:

```shell
cargo build-sbf
```

This command will take a few seconds to complete. When the previous command completes, open another terminal by going to Terminal -> New Terminal. In the new terminal, type the command:

```shell
solana-test-validator
```

This command will start a solana validator to where we will be able to deploy the contract. Keep the terminal open so the validator continues running. Finally, return to the terminal where you built the contract and type the command:

```shell
solana program deploy target/deploy/budget_tracker.so
```

This command will deploy the built contract to the local solana validator we ran in the previous step. When the command completes, it will return the _Program Id_ of the contract and save it for later.

## 5. Integrate the TypeScript client library

Wow! We have built and deployed a Solana smart contract in just a few minutes. The last step is to use this smart contract from our application. For this QuickStart, our application will be a command line interface.

Create a new file inside the `sdk` directory named `app.ts`. The file's content is the following:

```typescript
import {
    createUserRecordSendAndConfirm,
    getRecord,
    registerIncomeSendAndConfirm,
    registerOutcomeSendAndConfirm,
    SetProgramId
} from "./index";
import {Connection, Keypair} from "@solana/web3.js";
import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";

async function main(feePayer: Keypair) {
    // TODO: Specify the smart contract Program Id we saved from when we deploy the smart contract
    SetProgramId("PASTE_YOUR_PROGRAM_ID");

    // Instantiate a new Solana connection
    const connection = new Connection("http://127.0.0.1:8899");

    // 1. Create a user record, logs the state of the account after creating it
    await createUserRecordSendAndConfirm(connection, "John Doe", feePayer.publicKey, feePayer);
    let record = await getRecord(connection, feePayer.publicKey);
    console.info(record);

    // 2. Registered a new income with a value of 100
    await registerIncomeSendAndConfirm(connection, 100, feePayer.publicKey, feePayer);
    record = await getRecord(connection, feePayer.publicKey);
    console.info(record);

    // 3. Registered a new outcome with a value of 50
    await registerOutcomeSendAndConfirm(connection, 50, feePayer.publicKey, feePayer);
    record = await getRecord(connection, feePayer.publicKey);
    console.info(record);
}

fs.readFile(path.join(os.homedir(), ".config/solana/id.json"))
    .then(file => main(Keypair.fromSecretKey(new Uint8Array(JSON.parse(file.toString())))));
```

Before executing the file, we need to specify the contract we want to communicate. When we deployed the smart contract, it returned a _Program Id_; this _Progrma Id_ should be pasted as a string to the function `SetProgramId();`

Finally, execute the app.ts file. Open a new terminal by going to Terminal -> New Terminal. Navigate to the sdk directory `cd sdk`; install the node dependencies executing the command `yarn install` and then execute the file using the following command:

```shell
npx ts-node app.ts
```

If everything went Ok, you should see the following output:

```shell
Record {
  name: 'John Doe',
  moves: 0,
  outcome: 0,
  income: 0,
  totalBalance: 0n,
  pubkey: PublicKey [PublicKey(HoFZA9XdaR28mm7YGcqAvo1tk8C9UY6Mz2fKEQRcbAZG)] {
    _bn: <BN: f9942a305de619bad344e097e6cdbef152ae52420a78507a3f429dba72ca1953>
  }
}
Record {
  name: 'John Doe',
  moves: 1,
  outcome: 0,
  income: 100,
  totalBalance: 100n,
  pubkey: PublicKey [PublicKey(HoFZA9XdaR28mm7YGcqAvo1tk8C9UY6Mz2fKEQRcbAZG)] {
    _bn: <BN: f9942a305de619bad344e097e6cdbef152ae52420a78507a3f429dba72ca1953>
  }
}
Record {
  name: 'John Doe',
  moves: 2,
  outcome: 50,
  income: 100,
  totalBalance: 50n,
  pubkey: PublicKey [PublicKey(HoFZA9XdaR28mm7YGcqAvo1tk8C9UY6Mz2fKEQRcbAZG)] {
    _bn: <BN: f9942a305de619bad344e097e6cdbef152ae52420a78507a3f429dba72ca1953>
  }
}
``` 

## 6. Next steps

**Congratulations!** 🎉👏 you just created your first Solana smart contract using the CIDL and integrated the generated TypeScript client library with an application. To summarize what we learned:

- CIDL stands for Código Interface Description Language, and it is the input for Código’s AI Generator.
- After completing the CIDL, developers only need to concentrate on implementing the business logic of the smart contract. 100% of the client libraries and smart contracts boilerplate are automatically generated.
- Código Studio has all the tools and programs to develop smart contracts using the CIDL.

These links may help you on your journey to writing smart contracts with the CIDL:

- [Overview](#)
- [Learning the Basics](#)
- [Building Solana Programs with CIDL: A Comprehensive Guide Part I](#)

### Join the Codigo community 💚
Código is a growing community of developers. Join us on **[Discord](https://docs.google.com/forms/d/e/1FAIpQLSdSG0OgJ5xuwwU7JiSGBdn01L3ID68qNCd2HAnFSztXVYKmBg/viewform)** and **[GitHub](https://docs.google.com/forms/d/e/1FAIpQLSdGDGH4bwQf5dX3-uFCYeRKzIGbd5dVEPxHKQPTt63bBVVcVQ/viewform)** 








<!-- Let's discover **Codig Studio in less than 5 minutes**.

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes. -->
