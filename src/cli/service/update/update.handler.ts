import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import fs = require("fs");
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectService } from "../../../api/service/ZosConnectService";

export default class UpdateHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        const filePath = commandParameters.arguments.file;
        const fileBuf = fs.readFileSync(filePath);

        const profile = commandParameters.profiles.get("zosconnect");
        try {
            const service = await ZosConnectService.update(profile, commandParameters.arguments.serviceName, fileBuf);
            commandParameters.response.console.log(`Successfully updated Service ${service.name}`);
        } catch (error) {
            switch (error.constructor) {
                case(StatusCodeError):
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 400:
                            commandParameters.response.console.error("Invalid SAR file specified");
                            break;
                        case 401:
                        case 403:
                            commandParameters.response.console.error("Security error, Service was not updated");
                            break;
                        case 409:
                            commandParameters.response.console.error(
                                "Unable to update Service, it conflicts with an existing Service");
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
