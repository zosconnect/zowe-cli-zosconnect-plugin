import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectService } from "../../../api/service/ZosConnectService";
import { ConnectionUtil } from "../../../connection";

export default class ServiceStartHandler implements ICommandHandler {
    public async process(commandParams: IHandlerParameters): Promise<void> {
        const profile = commandParams.profiles.get("zosconnect");
        const session = ConnectionUtil.getSession(profile);
        try {
            await ZosConnectService.start(session, commandParams.arguments.serviceName);
            commandParams.response.console.log(`Successfully started API ${commandParams.arguments.serviceName}`);
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParams.response.console.error(
                                "Security error occurred when trying to start the Service");
                            break;
                        case 404:
                            commandParams.response.console.error(
                                `Service ${commandParams.arguments.serviceName} is not installed.`);
                            break;
                        default:
                            commandParams.response.console.error(statusCodeError.message);
                    }
                    break;
                case RequestError:
                    commandParams.response.console.error(`Unable to connect to ${session.address}`);
                    break;
                default:
                    commandParams.response.console.error(error);
            }
        }
    }
}
