import { ICommandArguments, ICommandOptionDefinition } from "@brightside/imperative";
import { ZosConnectSession } from "../ZosConnectSession";

export class ZosConnectSessionutils {
    public static ZCON_CONNECTION_OPTION_GROUP = "z/OS Connect EE Connection Options";

    public static ZCON_OPTION_ADDRESS: ICommandOptionDefinition = {
        name: "address",
        description: "URI of the z/OS Connect EE server",
        type: "string",
        aliases: ["a"],
        required: true,
        group: ZosConnectSessionutils.ZCON_CONNECTION_OPTION_GROUP,
    };

    public static ZCON_OPTION_USER: ICommandOptionDefinition = {
        name: "user",
        description: "User ID for accessing the server",
        type: "string",
        aliases: ["u"],
        required: false,
        group: ZosConnectSessionutils.ZCON_CONNECTION_OPTION_GROUP,
    };

    public static ZCON_OPTION_PASSWORD: ICommandOptionDefinition = {
        name: "password",
        description: "Password for the User",
        type: "string",
        aliases: ["p"],
        required: false,
        group: ZosConnectSessionutils.ZCON_CONNECTION_OPTION_GROUP,
    };

    public static ZCON_CONNECTION_OPTIONS: ICommandOptionDefinition[] = [
        ZosConnectSessionutils.ZCON_OPTION_ADDRESS,
        ZosConnectSessionutils.ZCON_OPTION_USER,
        ZosConnectSessionutils.ZCON_OPTION_PASSWORD,
    ];

    public static createZosConnectSession(args: ICommandArguments) {
        return new ZosConnectSession(args.address, args.user, args.password);
    }
}
