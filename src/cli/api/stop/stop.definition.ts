import { ICommandDefinition } from "@brightside/imperative";

export const StopDefinition: ICommandDefinition = {
    name: "stop",
    description: "Set an APIs status to stopped",
    type: "command",
    handler: __dirname + "/stop.handler",
    positionals: [{
        name: "apiName",
        description: "The name of the API to stop.",
        type: "string",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
