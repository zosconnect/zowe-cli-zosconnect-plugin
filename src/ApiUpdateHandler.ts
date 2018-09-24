import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import fs = require('fs');
import { ZosConnect } from "./ZosConnect"

export default class ApiUpdateHander implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters) {
        let filePath = commandParameters.arguments.file;
        let fileBuf = fs.readFileSync(filePath);

        let zosConn = new ZosConnect({uri: commandParameters.profiles.get("zosconnect").address});
        try {
            let api = await zosConn.getApi(commandParameters.arguments.apiName);
            await api.update(fileBuf);
            commandParameters.response.console.log("Successfully updated API " + api.getApiName())
        } catch (error) {
            commandParameters.response.console.error(error);
        }
    }
}
