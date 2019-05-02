import { IHandlerParameters } from "@brightside/imperative";
import fs = require("fs");
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectApi } from "../../../api/api/ZosConnectApi";
import { ZosConnectBaseHandler } from "../../ZosConnectBaseHandler";

export default class ApiUpdateHander extends ZosConnectBaseHandler {
    public async processCmd(commandParameters: IHandlerParameters) {
        const filePath = commandParameters.arguments.file;
        let fileBuf;
        try {
            fileBuf = fs.readFileSync(filePath);
        } catch (error) {
            commandParameters.response.console.error(`Unable to load AAR file (${error.message})`);
            return;
        }

        try {
            const api = await ZosConnectApi.update(this.session, commandParameters.arguments.apiName, fileBuf);
            commandParameters.response.console.log("Successfully updated API " + api.name);
        } catch (error) {
            switch (error.constructor) {
                case(StatusCodeError):
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 400:
                            commandParameters.response.console.error("Invalid AAR file specified");
                            break;
                        case 401:
                        case 403:
                            commandParameters.response.console.error("Security error, API was not updated");
                            break;
                        case 404:
                            commandParameters.response.console.error(
                                `API ${commandParameters.arguments.apiName} is not installed.`);
                            break;
                        case 409:
                            commandParameters.response.console.error(
                                "Unable to update API, it conflicts with an existing API");
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
