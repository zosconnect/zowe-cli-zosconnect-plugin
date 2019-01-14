import { ICommandDefinition } from "@brightside/imperative";

export const StopDefinition: ICommandDefinition = {
    name: "stop",
    description: "Set a Services status to stopped",
    type: "command",
    handler: __dirname + "/stop.handler",
    positionals: [{
        name: "serviceName",
        description: "The name of the Service to stop.",
        type: "string",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
