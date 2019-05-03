import { IHandlerParameters } from "@brightside/imperative";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectApiRequester } from "../../../api/apirequester/ZosConnectApiRequester";
import { ZosConnectBaseHandler } from "../../ZosConnectBaseHandler";

export default class ApiRequesterDeleteHandler extends ZosConnectBaseHandler {
    public async processCmd(commandParams: IHandlerParameters): Promise<void> {
        try {
            await ZosConnectApiRequester.delete(this.session, commandParams.arguments.apiRequesterName,
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
                    commandParams.response.console.error(`Unable to connect to ${this.session.address}`);
                    break;
                default:
                    commandParams.response.console.error(error);
            }
        }
    }
}
