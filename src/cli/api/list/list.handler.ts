import {ICommandHandler, IHandlerParameters} from "@brightside/imperative";
import {ZosConnect} from "@zosconnect/zosconnect-node";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ConnectionUtil } from "../../../connection";

export default class ApiListHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        const profile = commandParameters.profiles.get("zosconnect");
        const zosConn = ConnectionUtil.getConnection(profile);
        try {
            const apis = await zosConn.getApis();
            const resultsObj = [];
            for (const api of apis) {
                resultsObj.push({name: api.getApiName(), version: api.getVersion(), description: api.getDescription()});
                commandParameters.response.console.log(
                    `${api.getApiName()}(${api.getVersion()}) - ${api.getDescription()}`);
            }

            commandParameters.response.data.setObj(resultsObj);
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParameters.response.console.error("Security error, unable to display APIs");
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
