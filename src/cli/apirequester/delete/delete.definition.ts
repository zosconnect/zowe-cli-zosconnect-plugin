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
    profile: {
        required: ["zosconnect"],
    },
};
