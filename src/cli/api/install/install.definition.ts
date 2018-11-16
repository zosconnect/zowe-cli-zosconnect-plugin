import {ICommandDefinition} from "@brightside/imperative";

export const InstallDefinition: ICommandDefinition = {
    name: "install",
    description: "Install a new API",
    type: "command",
    handler: __dirname + "/install.handler",
    positionals: [{
        name: "file",
        type: "string",
        description: "The AAR file to install",
        required: true
    }],
    profile: {
        required: ["zosconnect"]
    }
}