---
sidebar_position: 4
---

#  Completing the stubs and using the SDK

After defining your smart contract interfaces, the next step is implementing the business logic and integrating the client libraries. This document will take you through this process.

:::info
As good security best practices and owner of the implemented business logic, you, the developer, should always validate and sanitize the input sent from the client. As the implementer of the business logic, you are the only one who can determine what is valid or invalid data for your business. Please review our **[Terms of Service](https://docs.codigo.ai/terms_of_service)** for more information.
:::

## Implementing business logic

For this doc, we will use the budget tracker example; you can clone it from [Código Examples](https://github.com/Codigo-io/examples). The budget tracker CIDL will generate the following stub files.

| ![Budget Tracker Stub Files](../../static/img/Budget%20Tracker%20Stub%20Files.png) |
| :-------------------------------------------------------------------------------   |

After Código AI Generator completes its job, you will find a directory named stubs within the generated directories and files. We will implement the business logic in these stubs files. Each method defined in the CIDL will have a file with the same name as the method inside the stubs directory. 

Whenever we open one of the stub files, we see a function corresponding to the same name as the file; thus, the same name as the method defined in the CIDL. For example, if we open the `create_user_record.rs`, we will see the following code:

```
use crate::rendered::state::*;
use solana_program::{account_info::*, entrypoint::*, pubkey::*};

/// To call once per account. Initialize a Record account. The total total_balance of the account will be set to 0.
///
/// # Arguments
///
/// * `user_record`
/// * `user_name` - The username to be assigned to the Record.name property
pub fn create_user_record(user_record: &mut WithMeta<Record>, user_name: String) -> ProgramResult {
    // Place your business logic here...

    Ok(())
}
```

When we specify the method’s summary and the inputs’ description, Código AI Generator will render documentation comments into the source code, allowing developers to understand the source code and build the documentation using the command `cargo doc` for Rust-based blockchains. For more on generating documentation, read [Creating the web-based documentation](https://docs.codigo.ai/guides/web-based%20documentation).

If the method definition in the CIDLs includes inputs, these will also be rendered into the stub function. It is important to note that you will receive the data structure wrap for complex blockchain data structures like Solana Accounts. The wrapper's purpose is to add the data itself of the data structure, the data used to build it, and any additional metadata information that comes with it.

Finally, you will be implementing the business logic inside the stub functions. From here on, you can create your business models and use these business models within the stub functions. 

## Integrating client libraries

Working with the client libraries is a simpler task because 100% of the code is generated. At the moment, we only generate TypeScript SDK. You can find this client library in the `sdk` directory of the generated directories. 

The client libraries support the browser and nodejs application. You can build the SDK by executing the command `npm build` or add the SDK as a dependency to your JavaScript/TypeScript project.

The SDK will contain exported functions with the same names as the method defined in the CIDL. In addition, it will export getters for each data structure defined in the CIDL. From the previous example, it will look like this in the SDK:

```
export {
  createUserRecord,
  createUserRecordSendAndConfirm,
  registerIncome,
  registerIncomeSendAndConfirm,
  registerOutcome,
  registerOutcomeSendAndConfirm,
} from "./core";

export { getRecord } from "./core";

export { GetProgramId, SetProgramId } from "./constants";
```

You can find your exported functions in the file `sdk/index.ts`. We can see an exported function named `SetProgramId`; this function needs to be called with the required parameters before calling any other functions.    

## Next steps
Congratulations! 🎉👏 at this point, you should have a basic understanding of implementing business logic and integrating the SDK. To summarize what we learned:

- Each method defined in the CIDL will have a file with the same name as the method inside the stubs directory. 
- It is recommended to specify a summary and description to generate documentation.
- Complex blockchain data structure will be wrapped for better accessibility.
- 100% of the client libraries are generated; thus, it only requires integration with your application.
- Código AI Generator generates getters for each data structure defined in the CIDL.
- We neet to call `SetProgramId` before using any exported function of the SDK.

These links may help you on your journey to writing smart contracts with the CIDL:
- [Código Examples](https://github.com/Codigo-io/examples)

### Join the Código community 💚
Código is a growing community of developers. Join us on **[Discord](https://docs.google.com/forms/d/e/1FAIpQLSdSG0OgJ5xuwwU7JiSGBdn01L3ID68qNCd2HAnFSztXVYKmBg/viewform)** and **[GitHub](https://docs.google.com/forms/d/e/1FAIpQLSdGDGH4bwQf5dX3-uFCYeRKzIGbd5dVEPxHKQPTt63bBVVcVQ/viewform)** 

