import { IHandlerParameters } from "@brightside/imperative";
import fs = require("fs");
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectApiRequester } from "../../../api/apirequester/ZosConnectApiRequester";
import { ZosConnectBaseHandler } from "../../ZosConnectBaseHandler";

export default class ApiRequesterUpdateHander extends ZosConnectBaseHandler {
    public async processCmd(commandParameters: IHandlerParameters) {
        const filePath = commandParameters.arguments.file;
        let fileBuf;
        try {
            fileBuf = fs.readFileSync(filePath);
        } catch (error) {
            commandParameters.response.console.error(`Unable to load ARA file (${error.message})`);
            return;
        }

        try {
            const apiRequester = await ZosConnectApiRequester.update(this.session,
                commandParameters.arguments.apiRequesterName, fileBuf);
            commandParameters.response.console.log("Successfully updated API " + apiRequester.name);
        } catch (error) {
            switch (error.constructor) {
                case(StatusCodeError):
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 400:
                            commandParameters.response.console.error("Invalid ARA file specified");
                            break;
                        case 401:
                        case 403:
                            commandParameters.response.console.error("Security error, API Requester was not updated");
                            break;
                        case 404:
                            commandParameters.response.console.error(
                                `API Requester ${commandParameters.arguments.apiRequesterName} is not installed.`);
                            break;
                        case 409:
                            commandParameters.response.console.error(
                                "Unable to update API Requester, it conflicts with an existing API Requester");
                            break;
                        default:
                            commandParameters.response.console.error(statusCodeError.message);
                    }
                    break;
                case RequestError:
                    commandParameters.response.console.error(`Unable to connect to ${this.session.address}`);
                    break;
                default:
                    commandParameters.response.console.error(error);
            }
        }
    }
}
