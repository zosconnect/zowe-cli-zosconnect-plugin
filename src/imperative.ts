import {IImperativeConfig} from '@brightside/imperative';

const config : IImperativeConfig = {
    commandModuleGlobs: ["**/cli/*/*.definition!(.d).*s"],
    rootCommandDescription: "z/OS Connect EE plugin for Zowe CLI",
    name: "zosconnect",
    profiles: [{
        type: "zosconnect",
        schema: {
            type: "object",
            title: "z/OS Connect EE Profile",
            description: "z/OS Connect EE connection profile",
            properties: {
                address: {
                    type: "string",
                    optionDefinition: {
                        description: "URI of the z/OS Connect EE server",
                        type: "string",
                        name: "address", 
                        aliases: ["a"],
                        required: true,
                    },
                },
                user: {
                    type: "string",
                    optionDefinition: {
                        description: "User ID for accessing the server",
                        type: "string",
                        name: "user",
                        aliases: ["u"],
                        required: false,
                    }
                },
                password: {
                    type: "password",
                    optionDefinition: {
                        description: "Password for the User",
                        type: "string",
                        name: "password",
                        aliases: ["p"],
                        required: false,
                        implies: ["user"]
                    }
                }
            },
            required: ["address"]
        }
    }],
    pluginHealthCheck: __dirname + "/healthcheck.handler"
}

export = config;