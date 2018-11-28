import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import fs = require('fs');
import { ZosConnect } from "@zosconnect/zosconnect-node"
import { ConnectionUtil } from "../../../connection";
import { StatusCodeError } from "request-promise/errors";

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
            switch(error.constructor){
                case(StatusCodeError):
                    let statusCodeError = error as StatusCodeError;
                    switch(statusCodeError.statusCode){
                        case 400:
                            commandParameters.response.console.error("Invalid AAR file specified");
                            break;
                        case 401:
                        case 403:
                            commandParameters.response.console.error('Security error, API was not updated');
                            break;
                        case 409:
                            commandParameters.response.console.error('Unable to update API, it conflicts with an existing API');
                            break;
                        default:
                            commandParameters.response.console.error(statusCodeError.message);
                    }
                    break;
                default:
                    commandParameters.response.console.error(error);
            }
        }
    }
}
