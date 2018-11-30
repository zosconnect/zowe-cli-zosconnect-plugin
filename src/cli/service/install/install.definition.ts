import { ICommandDefinition } from "@brightside/imperative";

export const InstallDefinition: ICommandDefinition = {
    name: "install",
    description: "Install a new Service",
    type: "command",
    handler: __dirname + "/install.handler",
    positionals: [{
        name: "file",
        type: "string",
        description: "The SAR file to install",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
