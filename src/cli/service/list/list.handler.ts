import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectService } from "../../../api/service/ZosConnectService";
import { ConnectionUtil } from "../../../connection";

export default class ServiceListHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        const profile = commandParameters.profiles.get("zosconnect");
        const session = ConnectionUtil.getSession(profile);
        try {
            const services = await ZosConnectService.list(session);
            for (const service of services) {
                commandParameters.response.console.log(`${service.name} - ${service.description} ` +
                    `[${service.serviceProvider}]`);
            }
            commandParameters.response.data.setObj(services);
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
                    commandParameters.response.console.error(`Unable to connect to ${session.address}`);
                    break;
                default:
                    commandParameters.response.console.error(error);
            }
        }
    }
}
