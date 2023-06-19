---
sidebar_position: 1
id: Codigo Docs
slug: /
---
# Quickstart Guide

<!-- # Intro to Codigo Studio -->

## Getting Started with Codigo Studio: Accessing the Interface and Familiarizing Yourself with the Tools

Welcome to our guide on how to use **Codigo Studio**, our web-based code editor environment. Codigo Studio provides a comprehensive set of tools and programs for developers to create projects using our Codigo Interface Description Language, or CIDL for short.

Whether you're an experienced developer or just starting out, Codigo Studio makes it easy to write, debug, and test your code in one central location. In this guide, we'll provide step-by-step instructions on how to get started with Codigo Studio and begin developing with CIDL.

By the end of this guide, you'll be able to navigate the Codigo Studio interface, use the various tools and programs available, create and edit CIDL files, and export your project for deployment.

Let's get started! 

Open **[Codigo Studio](https://cidlstudio-soham.codigo.ai/)**

## Codigo Studio in Action

Codigo Studio is built on the foundation of Visual Studio Code, a popular desktop code editor used by many developers. As a result, if you have experience using VSCode, you'll find that the web-based environment of Codigo Studio will feel familiar and intuitive.

| ![Codigo Studio](../static/img/Codigo-Studio.png) |
| :-------------------------------------------------: |
|                 *Codigo Studio Interface*           |

Codigo Studio is composed of several main sections that provide different functionalities to developers. These sections include:

- **Editor**: This is the main area where developers write and edit their code. The editor is highly customizable and supports a wide range of programming languages.
- **Sidebar**: The sidebar provides quick access to different features and functionalities of Codigo Studio, including file explorer, search, source control, debugging, and extensions.
- **Status Bar**: The status bar displays information about the current file being edited, such as the programming language, indentation, and file encoding. It also provides access to various features and settings, such as language mode and line-ending format.
- **Command Palette**: The command palette allows developers to execute commands and perform tasks within Codigo Studio, such as opening files, running tasks, and installing extensions.
- **Settings**: Codigo Studio allows developers to customize various settings and preferences to tailor their development experience to their specific needs and preferences.

By leveraging these different sections and their functionalities, developers can efficiently and effectively write, debug, and test their code using Codigo Studio.

## Available tools and programs

Codigo Studio provides a comprehensive set of tools and programs for developers to create projects using our CIDL, these tools are:

### Cargo CLI

The Cargo CLI is a command-line interface tool used for managing Rust projects. It is the official build tool and package manager for Rust, and it makes it easy for developers to create, build, and manage Rust projects.

For now the commands that we are going to use is:

- `cargo build-sbf` with this command we are going to build our Solana Contracts

You can learn more about Cargo CLI by clicking **[here](https://doc.rust-lang.org/cargo/commands/index.html)**

### Solana CLI

The Solana CLI (Command Line Interface) is a set of command-line tools used to interact with the Solana blockchain. It lets you create a wallet, send and receive SOL tokens, and participate in the cluster by delegating stake. The CLI provides a simple and efficient way to get started with Solana.

For now the commands that we are going to use are:

- `solana program deploy path/to/your_solana_contract.so` with this command you are able to deploy the solana program to a validator.
- `solana address` - Returns your public key.
- `solana config get` - Allows you to get information about the Solana CLI, like the RPC URL, where the Key pair is located, etc.

You can learn more about Solana CLI by clicking **[here](https://docs.solana.com/cli/conventions)**

:::note

The Solana CLI RPC URL comes preconfigured to: http://127.0.0.1:8899

:::

### Codigo CLI

The Codigo CLI is a powerful command-line tool used for managing CIDL files. With it, you can easily generate Solana contracts and TypeScript clients

The available commands are:

- `codigo generate path/to/your_cidl.yaml` with this command you can generate the Solana Contract and TypeScript Client. 

You can learn more about Codigo CLI by clicking **[here](Link to CODIGO CLI doc part here)**

### Others programs and Tools

The Codigo Studio environment comes with additional tools and programs to get you started working with the CIDL. These are:

- The **Node CLI** is a tool that allows you to run JavaScript code outside of a web browser. It's essential for creating and testing server-side applications, build scripts, and other JavaScript projects in a command-line environment.
- The **Git CLI** is a tool for managing and tracking changes to your codebase. With Git, you can create and maintain code branches, collaborate with others, and track changes over time.

#### Documentation detectives wanted! If you've spotted any gaps or have suggestions to level up our documentation game, we'd love to hear from you!
[![Button Example]][Link]
[Link]: https://docs.google.com/forms/d/e/1FAIpQLSf94Rm0XwNrU0Wdq63G8ucH8XEHH1ecOJARNGnxQcyqTtz80A/viewform
[Button Example]: https://img.shields.io/badge/Feedback-FD971F?style=for-the-badge



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
