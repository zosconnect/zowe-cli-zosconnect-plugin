import { ICommandDefinition } from "@brightside/imperative";

export const UpdateDefinition: ICommandDefinition = {
    name: "update",
    description: "Update an existing API Requester",
    type: "command",
    handler: __dirname + "/update.handler",
    positionals: [{
        name: "apiRequesterName",
        description: "The name of the API Requester to update",
        type: "string",
        required: true,
    },
    {
        name: "file",
        description: "The new ARA file for the API Requester",
        type: "string",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
