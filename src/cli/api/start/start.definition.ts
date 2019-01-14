import { ICommandDefinition } from "@brightside/imperative";

export const StartDefinition: ICommandDefinition = {
    name: "start",
    description: "Set an APIs status to started",
    type: "command",
    handler: __dirname + "/start.handler",
    positionals: [{
        name: "apiName",
        description: "The name of the API to start.",
        type: "string",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
