import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import {ConnectionUtil} from "../../../connection";
import { StatusCodeError } from "request-promise/errors";

export default class ApiDeleteHandler implements ICommandHandler {
    public async process(commandParams: IHandlerParameters) {
        let zosConn = ConnectionUtil.getConnection(commandParams.profiles.get("zosconnect"));
        try {
            let api = await zosConn.getApi(commandParams.arguments.apiName);
            await api.stop();
            await api.delete();
            commandParams.response.console.log("Successfully deleted API " + commandParams.arguments.apiName);
        } catch (error) {
            switch(error.constructor){
                case StatusCodeError:
                    let statusCodeError = error as StatusCodeError;
                    switch(statusCodeError.statusCode){
                        case 401:
                        case 403:
                            commandParams.response.console.error('Security error occurred when trying to delete the API');
                            break;
                        case 404:
                            commandParams.response.console.error(`API ${commandParams.arguments.apiName} is not installed.`);
                            break;
                        default:
                            commandParams.response.console.error(statusCodeError.message);
                    }
                    break;
                default:
                    commandParams.response.console.error(error);
            }
        }
    }
}