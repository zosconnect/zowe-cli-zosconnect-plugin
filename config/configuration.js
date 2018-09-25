module.exports = {
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
            },
            required: ["address"]
        }
    }],
    definitions: [{
        name: "api",
        type: "group",
        description: "Manage Inbound APIs",
        children: [
            {
                name: "install",
                description: "Install a new API",
                type: "command",
                handler: "lib/ApiInstallHandler",
                positionals: [{
                    name: "file",
                    type: "string",
                    description: "The AAR file to install",
                    required: true
                }],
                profile: {
                    required: ["zosconnect"]
                }
            },
            {
                name: "update",
                description: "Update an existing API",
                type: "command",
                handler: "lib/ApiUpdateHandler",
                positionals: [{
                    name: "apiName",
                    description: "The name of the API to delete.",
                    type: "string",
                    required: true
                },
                {
                    name: "file",
                    description: "The new AAR file for the API",
                    type: "string",
                    required: true
                }],
                profile: {
                    required: ["zosconnect"]
                }
            },
            {
                name: "delete",
                description: "Delete an API",
                type: "command",
                handler: "lib/ApiDeleteHandler",
                positionals: [{
                    name: "apiName",
                    description: "The name of the API to delete.",
                    type: "string",
                    required: true
                }],
                profile: {
                    required: ["zosconnect"]
                }
            },
            {
                name: "list",
                description: "List the APIs installed in the server",
                type: "command",
                handler: "lib/ApiListHandler",
                profile: {
                    required: ["zosconnect"]
                }
            }
        ]
    }]
}