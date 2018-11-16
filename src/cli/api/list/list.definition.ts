import {ICommandDefinition} from "@brightside/imperative";

export const ListDefinition: ICommandDefinition = {
    name: "list",
    description: "List the APIs installed in the server",
    type: "command",
    handler: __dirname + "/list.handler",
    profile: {
        required: ["zosconnect"]
    }
}