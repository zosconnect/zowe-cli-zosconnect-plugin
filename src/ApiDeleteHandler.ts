import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { ZosConnect } from "./ZosConnect";

export default class ApiDeleteHandler implements ICommandHandler {
    public async process(commandParams: IHandlerParameters) {
        let zosConn = new ZosConnect({uri: commandParams.profiles.get("zosconnect").address});
        try {
            let api = await zosConn.getApi(commandParams.arguments.apiName);
            await api.stop();
            await api.delete();
            commandParams.response.console.log("Successfully deleted API " + commandParams.arguments.apiName);
        } catch (error) {
            commandParams.response.console.error(error);
        }
    }
}