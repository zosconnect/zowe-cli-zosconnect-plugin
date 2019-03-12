import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectApi } from "../../../api/api/ZosConnectApi";
import { ConnectionUtil } from "../../../connection";

export default class ApiStartHandler implements ICommandHandler {
    public async process(commandParams: IHandlerParameters): Promise<void> {
        const profile = commandParams.profiles.get("zosconnect");
        const session = ConnectionUtil.getSession(profile);
        try {
            await ZosConnectApi.start(session, commandParams.arguments.apiName);
            commandParams.response.console.log(`Successfully started API ${commandParams.arguments.apiName}`);
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParams.response.console.error(
                                "Security error occurred when trying to start the API");
                            break;
                        case 404:
                            commandParams.response.console.error(
                                `API ${commandParams.arguments.apiName} is not installed.`);
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
