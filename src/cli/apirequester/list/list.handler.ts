import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ConnectionUtil } from "../../../connection";

export default class ApiRequesterListHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        const profile = commandParameters.profiles.get("zosconnect");
        const zosConn = ConnectionUtil.getConnection(profile);
        try {
            const apiRequesters = await zosConn.getApiRequesters();
            const resultObj = [];
            for (const apiRequester of apiRequesters) {
                resultObj.push({name: apiRequester.getName(),
                                description: apiRequester.getDescription(),
                                version: apiRequester.getVersion()});
                commandParameters.response.console.log(
                    `${apiRequester.getName()}(${apiRequester.getVersion()}) - ${apiRequester.getDescription()}`);
            }
            commandParameters.response.data.setObj(resultObj);
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParameters.response.console.error(
                                "Security error, unable to display API Requesters");
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
