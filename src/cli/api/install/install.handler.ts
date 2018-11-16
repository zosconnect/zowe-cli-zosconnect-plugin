import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import fs = require('fs');
import { ZosConnect } from '@zosconnect/zosconnect-node';

export default class ApiInstallHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters) {
        let filePath = commandParameters.arguments.file;
        let fileBuf = fs.readFileSync(filePath);

        let zosConn = new ZosConnect({uri: commandParameters.profiles.get("zosconnect").address});
        try {
            let api = await zosConn.createApi(fileBuf);
            commandParameters.response.data.setObj(api);
            commandParameters.response.console.log("Successfully installed API " + api.getApiName())
        } catch (error) {
            commandParameters.response.console.error(error);
        }
    }
}