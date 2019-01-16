import { ICommandDefinition } from "@brightside/imperative";

export const DeleteDefinition: ICommandDefinition = {
    name: "delete",
    description: "Delete an API",
    type: "command",
    handler: __dirname + "/delete.handler",
    positionals: [{
        name: "apiName",
        description: "The name of the API to delete.",
        type: "string",
        required: true,
    }],
    options: [{
        name: "force",
        type: "boolean",
        description: "Whether the API should be deleted regardless of status",
        aliases: ["f"],
    }],
    profile: {
        required: ["zosconnect"],
    },
};
