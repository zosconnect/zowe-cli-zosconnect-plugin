import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectApi } from "../../../api/api/ZosConnectApi";
import { ConnectionUtil } from "../../../connection";

export default class ApiDeleteHandler implements ICommandHandler {
    public async process(commandParams: IHandlerParameters) {
        const profile = commandParams.profiles.get("zosconnect");
        const session = ConnectionUtil.getSession(profile);
        try {
            await ZosConnectApi.delete(session, commandParams.arguments.apiName, commandParams.arguments.force);
            commandParams.response.console.log("Successfully deleted API " + commandParams.arguments.apiName);
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParams.response.console.error(
                                "Security error occurred when trying to delete the API");
                            break;
                        case 404:
                            commandParams.response.console.error(
                                `API ${commandParams.arguments.apiName} is not installed.`);
                            break;
                        case 409:
                            commandParams.response.console.error(
                                `API ${commandParams.arguments.apiName} is started.`);
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
