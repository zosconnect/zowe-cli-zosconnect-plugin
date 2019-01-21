import { ICommandDefinition } from "@brightside/imperative";

export const DeleteDefinition: ICommandDefinition = {
    name: "delete",
    description: "Delete an API Requester",
    type: "command",
    handler: __dirname + "/delete.handler",
    positionals: [{
        name: "apiRequesterName",
        description: "The name of the API Requster to delete.",
        type: "string",
        required: true,
    }],
    options: [{
        name: "force",
        type: "boolean",
        description: "Delete the API Requester regardless of status.",
        aliases: ["f"],
    }],
    profile: {
        required: ["zosconnect"],
    },
};
