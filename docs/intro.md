---
sidebar_position: 1
id: Codigo Docs
slug: /
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
