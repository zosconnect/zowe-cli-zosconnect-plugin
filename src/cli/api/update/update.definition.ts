import {ICommandDefinition} from "@brightside/imperative";

export const UpdateDefinition: ICommandDefinition = {
    name: "update",
    description: "Update an existing API",
    type: "command",
    handler: __dirname + "/update.handler",
    positionals: [{
        name: "apiName",
        description: "The name of the API to delete.",
        type: "string",
        required: true,
    },
    {
        name: "file",
        description: "The new AAR file for the API",
        type: "string",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
