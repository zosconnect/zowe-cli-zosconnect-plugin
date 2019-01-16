import { ICommandDefinition } from "@brightside/imperative";

export const DeleteDefinition: ICommandDefinition = {
    name: "delete",
    description: "Delete a Service",
    type: "command",
    handler: __dirname + "/delete.handler",
    positionals: [{
        name: "serviceName",
        description: "The name of the Service to delete",
        type: "string",
        required: true,
    }],
    options: [{
        name: "force",
        type: "boolean",
        description: "Delete the Service regardless of status.",
        aliases: ["f"],
    }],
    profile: {
        required: ["zosconnect"],
    },
};
