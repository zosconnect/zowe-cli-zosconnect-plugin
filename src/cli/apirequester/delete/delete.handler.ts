import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectApiRequester } from "../../../api/apirequester/ZosConnectApiRequester";
import { ConnectionUtil } from "../../../connection";

export default class ApiRequesterDeleteHandler implements ICommandHandler {
    public async process(commandParams: IHandlerParameters): Promise<void> {
        const profile = commandParams.profiles.get("zosconnect");
        const session = ConnectionUtil.getSession(profile);
        try {
            await ZosConnectApiRequester.delete(session, commandParams.arguments.apiRequesterName,
                commandParams.arguments.force);
            commandParams.response.console.log(
                `Successfully deleted API Requester ${commandParams.arguments.apiRequesterName}`);
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParams.response.console.error(
                                "Security error occurred when trying to delete the API Requester");
                            break;
                        case 404:
                            commandParams.response.console.error(
                                `API Requester ${commandParams.arguments.apiRequesterName} is not installed.`);
                            break;
                        case 409:
                            commandParams.response.console.error(
                                `API Requester ${commandParams.arguments.apiRequesterName} is started.`);
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
