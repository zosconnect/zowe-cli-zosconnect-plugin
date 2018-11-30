import { ICommandDefinition } from "@brightside/imperative";

export const UpdateDefinition: ICommandDefinition = {
    name: "update",
    description: "Update an exisiting Service",
    type: "command",
    handler: __dirname + "/update.handler",
    positionals: [{
        name: "serviceName",
        description: "The name of the Service to update.",
        type: "string",
        required: true,
    },
    {
        name: "file",
        description: "The new SAR file for the Service",
        type: "string",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
