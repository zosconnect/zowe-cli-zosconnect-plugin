import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { ConnectionUtil } from "../../../connection";
import { StatusCodeError } from "request-promise/errors";

export default class ServiceListHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        let zosConn = ConnectionUtil.getConnection(commandParameters.profiles.get('zosconnect'));
        try {
            let services = await zosConn.getServices();
            let resultsObj = [];
            for(const service of services){
                resultsObj.push({name: service.getName(), description: service.getDescription(), provider: service.getServiceProvider()});
                commandParameters.response.console.log(`${service.getName()} - ${service.getDescription()} [${service.getServiceProvider()}]`);
            }
        } catch (error) {
            switch(error.constructor){
                case StatusCodeError:
                    let statusCodeError = error as StatusCodeError;
                    switch(statusCodeError.statusCode){
                        case 401:
                        case 403:
                            commandParameters.response.console.error('Security error, unable to display Services');
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