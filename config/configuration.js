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
                handler: "lib/ApiListHandler"
            },
            {
                name: "update",
                description: "Update an existing API",
                type: "command",
                handler: "lib/ApiListHandler",
            },
            {
                name: "delete",
                description: "Delete an API",
                type: "command",
                handler: "lib/ApiListHandler"
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