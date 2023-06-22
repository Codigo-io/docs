---
sidebar_position: 4
---

# CIDL

## What is the Codigo Interface Description Language?

The Codigo Interface Description Language (CIDL)  is a formal language used to describe the interface of a blockchain smart contract. It can enable the expression and creation of programs of any level of complexity, from a single contract to multi contract applications.  It can be accessed by other contracts or users.  The CIDL accelerates blockchain development and increases the security of the code.


The Codigo Interface Description Language (CIDL) is a formal language designed to help blockchain developers structure and simplify the way they document and define the smart contracts and applications they are developing. 

The CIDL allows a developer to describe the interface of a blockchain smart contract. It specifies the data types, functions, and events that can be accessed by other contracts or users. This enables both human and computer users to express and understand the application specifications and capabilities of a smart contract with no ambiguity and with minimal learning or ramp-up-time required from the human user.  

The CIDL is accessible from a developer’s IDE or from Codigo’s web-based IDE and its specifications are written in YAML. 

## What are the CIDL parameters?

The CIDL parameters are used by developers to build applications that interact with one or multiple smart contracts.  It is a set of specifications that defines precisely the code that needs to be generated to meet the developers requirements.  This allows the developer to structure their thinking and saves a significant amount of lower level coding.  The parameters are also used to automatically populate the CIDL documentation templates. 

The CIDL parameters describe key aspects of a smart contract, including:

- **Blockchain**: The CIDL currently supports Solana but is intended to support multiple blockchains which will be added over time.  The developer has to specify which blockchain the smart contract is to be deployed on.  One CIDL is for one blockchain only.  Should the developer need to deploy on multiple blockchains, he/she needs to create a new CIDL for each.  Note that the process of creating a CIDL for another blockchain consists of exporting the parameters of the previous CIDL onto a new one, save for changes required by the new blockchain, which the new CIDL will automatically flag.
- **Client SDK programming language**: the CIDL currently supports typescript, and by extension javascript, but is intended to support additional programming languages, which will be added over time.
- **Data types**: boolean, string, integers, fixed number, address, bytes, enum etc. These attributes match those supported by the specific blockchain chosen for the application.  Data types tell the program compiler how the programmer intends to use the data by constraining the values that a variable or a function might use.  It is important to specify the data types to limit the storage space the resulting code will consume on a blockchain.
- **Functions**: self contained modules of code that accomplish specific tasks.  Functions are defined by name, keyword, visibility to other contracts, behavior and outputs. 
- The events and logs that can be accessed by other contracts, the frontend or users when a transaction is mined.
- In addition, the CIDL captures documentation upfront that is inserted throughout the code where relevant, and made available to third parties through a web-based document upon the completion of the code generation.  This includes the name of the program, description and any other relevant information for the documentation.

## Why use the CIDL?

There are several important reasons to use the CIDL.  Below we explore some of the most notable reasons developers turn to the CIDL PLatform.

### Simplify Development

The CIDL provides a clear, complete specification format of all the parameters of the smart contract in a language accessible to any developer (YAML).  The specification also makes it easy for different teams to work together, irrespective of the skillset or focus of each developer: other developers and users can discover and understand the capabilities of a Smart Contract created through the CIDL without requiring access to source code, additional documentation, or doing any reverse engineering. 

### Easy to update

Iterations are likely to occur.  Rather than going through all the source code, changes to the interfaces can be easily made in the CIDL and the generated code updates automatically, simplifying the process of making updates.

### Language agnostic

The Codigo Interface Description Language allows both humans and computers to interface with each other in a seamless manner.  The CIDL Specification removes guesswork in calling a Smart Contract and allows the resulting code generated to abide precisely to the specifications of the developer. 

### Platform independence

The Codigo Interface Language allows a developer to describe the interface of a blockchain smart contract in a way that is independent of any blockchain programming paradigm.  The benefit is that you can use the same IDL to describe an interface for different blockchains.

### Faster Development Through Code Generation

The CIDL automatically generates source code in seconds, specifically the smart contract boilerplate and stubs, client libraries, and all the test cases.  This saves development teams weeks of development time writing boilerplate, repetitive code and allows them to focus on the business logic and innovation perceptible to the end users.  The more complex the program (eg. multi contract or cross-chain contracts requiring cross program invocation, or CPI), the more time saved.

### Use Case Flexibility  

The CIDL is use-case agnostic in the sense that any set of interfaces, from simple to complex, can be expressed and the resulting generated code ties exactly to the specifications.  The CIDL benefits to extend developers working on popular use cases, such as gaming, commerce or finance, just as much as to developers working on completely novel applications where no precedent or prior template exists.

### Code Security

The code generated through the CIDL includes automatic checks for all variables and parameters, the platform also checks the signatures and the actual ownership of the data.   In addition, Codigo will provide the option of an external security audit from one of the leading security auditing firms to paying customers, providing an additional layer of trust to the code generated by the platform.

### Standardization

The CIDL provides a standard way of describing smart contract interfaces, and a consistent way in which the output is organized.  This standardization makes it easier for developers to understand and build upon the work of other developers, including across separate organizations.  

### Readable, Updated Documentation

The CIDL generates consistent and complete web-based documentation automatically based on the interface description.  Besides saving time for the developer, this also reduces the chances of errors vs. writing documentation manually.  It also ensures that the users of the smart contract have always access to the information they need and that the documentation is always accurate. All benefits related to the documentation are heightened by the fact that documentation is the most visible CIDL output.

## When to use the CIDL

Smart-contract based applications that benefit the most from the CIDL advantages have one or a combination of the following characteristics:

- Complex applications that require the collaboration of multiple teams
- Cross Program Invocation or cross-chain contract requirements
- Heightened need for code security
- High likelihood of changes to the code

## Who uses the CIDL?

Here are some examples of CIDL usage.

### Value Chain Optimization

Smart contracts are powerful tools for value chain optimization, enabling automation, efficiency and transparency across the entire value chain.  Specific examples include supply chain management, quality assurance, payment processing, risk management and compliance.  

What all these use cases have in common are:
- A large number of participants in the value chain requiring real-time information 
- A large number of transactions based on predetermined multi-factor conditions.  The CIDL benefits for value chain optimization are particularly important in this automation scenario because of the complexity of the smart contract based program required.  The time required to write the code manually is substantial, measured in months, and the potential for errors, revisions, and need for collaboration across teams from different organizations are high.  


### Finance

The finance sector is the furthest along among industry verticals adopting smart contract technology.  Financial applications and services include insurance, escrow services, securities trading, digital assets and decentralized finance (DeFi).  Given that every application involves large flows of capital, this sector has a particularly high level of sensitivity to the security of the code, besides the aspects related to automation, efficiency and transparency.  That’s the reason why the substantial automation provided by the CIDL is beneficial to the developer teams.  Not only is the level of complexity high, and therefore the development time required, but the cost of potential errors in the code can be extremely high.  Comprehensive automated testing eliminates or substantially reduces the surface area for exploits.

### Media

Smart-contract based applications in gaming, content monetization, digital identity management, digital rights management particularly benefit from the CIDL due to the high level of complexity, constant change and requirement for security.

### Join the Código community💚
Código is a growing community of developers. Join us on **[Discord](https://docs.google.com/forms/d/e/1FAIpQLSdSG0OgJ5xuwwU7JiSGBdn01L3ID68qNCd2HAnFSztXVYKmBg/viewform)** and **[GitHub](https://docs.google.com/forms/d/e/1FAIpQLSdGDGH4bwQf5dX3-uFCYeRKzIGbd5dVEPxHKQPTt63bBVVcVQ/viewform)**
