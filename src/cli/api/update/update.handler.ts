import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import fs = require('fs');
import { ZosConnect } from "@zosconnect/zosconnect-node"
import { ConnectionUtil } from "../../../connection";

export default class ApiUpdateHander implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters) {
        let filePath = commandParameters.arguments.file;
        let fileBuf = fs.readFileSync(filePath);

        let zosConn = ConnectionUtil.getConnection(commandParameters.profiles.get("zosconnect"));
        try {
            let api = await zosConn.getApi(commandParameters.arguments.apiName);
            await api.update(fileBuf);
            commandParameters.response.console.log("Successfully updated API " + api.getApiName())
        } catch (error) {
            commandParameters.response.console.error(error);
        }
    }
}
