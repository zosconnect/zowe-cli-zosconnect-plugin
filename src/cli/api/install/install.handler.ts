import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import fs = require('fs');
import { ZosConnect } from '@zosconnect/zosconnect-node';
import { ConnectionUtil } from "../../../connection";
import { StatusCodeError, RequestError } from "request-promise/errors";

export default class ApiInstallHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters) {
        let filePath = commandParameters.arguments.file;
        let fileBuf = fs.readFileSync(filePath);

        let profile = commandParameters.profiles.get("zosconnect");
        let zosConn = ConnectionUtil.getConnection(profile);
        try {
            let api = await zosConn.createApi(fileBuf);
            commandParameters.response.data.setObj(api);
            commandParameters.response.console.log("Successfully installed API " + api.getApiName())
        } catch (error) {
            switch(error.constructor){
                case StatusCodeError:
                    let statusCodeError = error as StatusCodeError;
                    switch(statusCodeError.statusCode){
                        case 400:
                            commandParameters.response.console.error('Unable to install API, invalid AAR file specified');
                            break;
                        case 401:
                        case 403:
                            commandParameters.response.console.error('Security error, API was not installed');
                            break;
                        case 409:
                            commandParameters.response.console.error('Unable to install API, one with the same name is already installed');
                            break;
                        default:
                            commandParameters.response.console.error(statusCodeError.message);
                    }
                    break;
                case RequestError:
                    commandParameters.response.console.error(`Unable to connect to ${profile.name}`);
                    break;
                default:
                    commandParameters.response.console.error(error);
            }
        }
    }
}