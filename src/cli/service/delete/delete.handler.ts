import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectService } from "../../../api/service/ZosConnectService";
import { ConnectionUtil } from "../../../connection";

export default class DeleteHandler implements ICommandHandler {
    public async process(commandParams: IHandlerParameters): Promise<void> {
        const profile = commandParams.profiles.get("zosconnect");
        const session = ConnectionUtil.getSession(profile);
        try {
            await ZosConnectService.delete(session, commandParams.arguments.serviceName, commandParams.arguments.force);
            commandParams.response.console.log(`Successfully deleted Service ${commandParams.arguments.serviceName}`);
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParams.response.console.error(
                                "Security error occurred when trying to delete the Service");
                            break;
                        case 404:
                            commandParams.response.console.error(
                                `Service ${commandParams.arguments.serviceName} is not installed.`);
                            break;
                        case 409:
                            commandParams.response.console.error(
                                `Service ${commandParams.arguments.serviceName} is started.`);
                            break;
                        default:
                            commandParams.response.console.error(statusCodeError.message);
                    }
                    break;
                case RequestError:
                    commandParams.response.console.error(`Unable to connect to ${profile.name}`);
                    break;
                default:
                    commandParams.response.console.error(error);
            }
        }
    }
}
