import { IHandlerParameters } from "@brightside/imperative";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectApi } from "../../../api/api/ZosConnectApi";
import { ZosConnectBaseHandler } from "../../ZosConnectBaseHandler";

export default class ApiStartHandler extends ZosConnectBaseHandler {
    public async processCmd(commandParams: IHandlerParameters): Promise<void> {
        try {
            await ZosConnectApi.stop(this.session, commandParams.arguments.apiName);
            commandParams.response.console.log(`Successfully started API ${commandParams.arguments.apiName}`);
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParams.response.console.error(
                                "Security error occurred when trying to stop the API");
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
                    commandParams.response.console.error(`Unable to connect to ${this.session.address}`);
                    break;
                default:
                    commandParams.response.console.error(error);
            }
        }
    }
}
