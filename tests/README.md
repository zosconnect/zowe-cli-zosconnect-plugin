# Integration Tests

The integration tests are designed to be run against a z/OS Connect EE server instance.

## Server configuration

The [server.xml](./server.xml) contains the required configuration to successfully run the tests. You may need to update the port number in the `httpEndpoint` configuration.

## Zowe CLI configuration

A zosconnect profile needs to be created and set as the default for the server the tests will be run against.

## Running the tests

* The plug-in needs to be installed into the Zowe CLI on the system.
* Run the tests by issuing the command `npm run integration`
