# Integrating the SDK

[//]: # (Working with the client libraries is a simpler task because 100% of the code is generated. At the moment, we only)

[//]: # (generate TypeScript SDK. You can find this client library in the `sdk` directory of the generated directories.)

[//]: # ()
[//]: # (The client libraries support the browser and nodejs application. You can build the SDK by executing the)

[//]: # (command `npm build` or add the SDK as a dependency to your JavaScript/TypeScript project.)

[//]: # ()
[//]: # (The SDK will contain exported functions with the same names as the method defined in the CIDL. In addition, it will)

[//]: # (export getters for each data structure defined in the CIDL. From the previous example, it will look like this in the)

[//]: # (SDK:)

[//]: # ()
[//]: # (```typescript showLineNumbers)

[//]: # (export {)

[//]: # (    createUserRecord,)

[//]: # (    createUserRecordSendAndConfirm,)

[//]: # (    registerIncome,)

[//]: # (    registerIncomeSendAndConfirm,)

[//]: # (    registerOutcome,)

[//]: # (    registerOutcomeSendAndConfirm,)

[//]: # (} from "./core";)

[//]: # ()
[//]: # (export {getRecord} from "./core";)

[//]: # ()
[//]: # (export {GetProgramId, SetProgramId} from "./constants";)

[//]: # (```)

[//]: # ()
[//]: # (You can find your exported functions in the file `sdk/index.ts`. We can see an exported function named `SetProgramId`;)

[//]: # (this function needs to be called with the required parameters before calling any other functions.)
