import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { ZosConnect } from "@zosconnect/zosconnect-node";
import fs = require("fs");
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ConnectionUtil } from "../../../connection";

export default class ApiUpdateHander implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters) {
        const filePath = commandParameters.arguments.file;
        const fileBuf = fs.readFileSync(filePath);

        const profile = commandParameters.profiles.get("zosconnect");
        const zosConn = ConnectionUtil.getConnection(profile);
        try {
            const api = await zosConn.getApi(commandParameters.arguments.apiName);
            await api.update(fileBuf);
            commandParameters.response.console.log("Successfully updated API " + api.getApiName());
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
                        case 409:
                            commandParameters.response.console.error(
                                "Unable to update API, it conflicts with an existing API");
                            break;
                        default:
                            commandParameters.response.console.error(statusCodeError.message);
                    }
                    break;
                case RequestError:
                    commandParameters.response.console.error(`Unable to connect to ${profile.name}`);
                    break;
                default:
                    commandParameters.response.console.error(error);
            }
        }
    }
}
