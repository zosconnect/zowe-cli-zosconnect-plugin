import {ICommandHandler, IHandlerParameters} from "@brightside/imperative"
import {ZosConnect} from "@zosconnect/zosconnect-node"
import { ConnectionUtil } from "../../../connection";
import { StatusCodeError } from "request-promise/errors";

export default class ApiListHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        let zosConn = ConnectionUtil.getConnection(commandParameters.profiles.get("zosconnect"));
        try {
            let apis = await zosConn.getApis();
            let resultsObj = [];
            for(const api of apis){
                resultsObj.push({name: api.getApiName(), version: api.getVersion(), description: api.getDescription()});
                commandParameters.response.console.log(`${api.getApiName()}(${api.getVersion()}) - ${api.getDescription()}`);
            }
            
            commandParameters.response.data.setObj(resultsObj);
        } catch (error) {
            switch(error.constructor){
                case StatusCodeError:
                    let statusCodeError = error as StatusCodeError;
                    switch(statusCodeError.statusCode){
                        case 401:
                        case 403:
                            commandParameters.response.console.error('Security error, unable to display APIs');
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