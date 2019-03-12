import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import fs = require("fs");
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectApiRequester } from "../../../api/apirequester/ZosConnectApiRequester";
import { ConnectionUtil } from "../../../connection";

export default class ApiRequsterInstallHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        const filePath = commandParameters.arguments.file;
        const fileBuf = fs.readFileSync(filePath);

        const profile = commandParameters.profiles.get("zosconnect");
        const session = ConnectionUtil.getSession(profile);
        try {
            const apiRequester = await ZosConnectApiRequester.install(session, fileBuf);
            commandParameters.response.data.setObj(apiRequester);
            commandParameters.response.console.log(`Successfully installed API Requester ${apiRequester.name}`);
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 400:
                            commandParameters.response.console.error(
                                "Unable to install API Requester, invalid ARA file specified");
                            break;
                        case 401:
                        case 403:
                            commandParameters.response.console.error("Security error, API Requster was not installed");
                            break;
                        case 409:
                            commandParameters.response.console.error(
                                "Unable to install API Requester, one with the same name is already installed");
                            break;
                        default:
                            commandParameters.response.console.error(statusCodeError.message);
                    }
                    break;
                case RequestError:
                    commandParameters.response.console.error(`Unable to connect to ${session.address}`);
                    break;
                default:
                    commandParameters.response.console.error(error);
            }
        }
    }
}
