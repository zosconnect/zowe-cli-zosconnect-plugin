import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { ZosConnect } from "@zosconnect/zosconnect-node";
import {ConnectionUtil} from "../../../connection";

export default class ApiDeleteHandler implements ICommandHandler {
    public async process(commandParams: IHandlerParameters) {
        let zosConn = ConnectionUtil.getConnection(commandParams.profiles.get("zosconnect"));
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