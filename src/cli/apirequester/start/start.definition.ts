import { ICommandDefinition } from "@brightside/imperative";

export const StartDefinition: ICommandDefinition = {
    name: "start",
    description: "Set an API Requester status to started",
    type: "command",
    handler: __dirname + "/start.handler",
    positionals: [{
        name: "apiRequesterName",
        description: "The name of the API Requester to start.",
        type: "string",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
