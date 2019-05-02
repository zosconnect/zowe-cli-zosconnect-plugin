import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { ZosConnectSession } from "../ZosConnectSession";
import { ZosConnectSessionutils } from "./ZosConnectionSessionUtils";

export abstract class ZosConnectBaseHandler implements ICommandHandler {

    protected session: ZosConnectSession;

    public async process(commandParameters: IHandlerParameters) {
        const profile = commandParameters.profiles.get("zosconnect");
        this.session = ZosConnectSessionutils.createZosConnectSession(commandParameters.arguments);
        this.processCmd(commandParameters);
    }

    public abstract async processCmd(commandParameters: IHandlerParameters): Promise<void>;

}
