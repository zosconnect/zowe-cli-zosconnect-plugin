import { ICommandDefinition } from "@brightside/imperative";

export const StartDefinition: ICommandDefinition = {
    name: "start",
    description: "Set a Services status to started",
    type: "command",
    handler: __dirname + "/start.handler",
    positionals: [{
        name: "serviceName",
        description: "The name of the Service to start.",
        type: "string",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
