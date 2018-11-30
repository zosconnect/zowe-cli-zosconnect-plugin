import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ConnectionUtil } from "../../../connection";

export default class ServiceListHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        const profile = commandParameters.profiles.get("zosconnect");
        const zosConn = ConnectionUtil.getConnection(profile);
        try {
            const services = await zosConn.getServices();
            const resultsObj = [];
            for (const service of services) {
                resultsObj.push({name: service.getName(),
                                 description: service.getDescription(),
                                 provider: service.getServiceProvider()});
                commandParameters.response.console.log(
                    `${service.getName()} - ${service.getDescription()} [${service.getServiceProvider()}]`);
            }
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParameters.response.console.error("Security error, unable to display Services");
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
