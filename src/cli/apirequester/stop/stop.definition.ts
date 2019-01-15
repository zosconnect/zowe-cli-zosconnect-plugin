import { ICommandDefinition } from "@brightside/imperative";

export const StopDefinition: ICommandDefinition = {
    name: "stop",
    description: "Set an API Requesters status to stopped",
    type: "command",
    handler: __dirname + "/stop.handler",
    positionals: [{
        name: "apiRequesterName",
        description: "The name of the API Requester to stop.",
        type: "string",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
