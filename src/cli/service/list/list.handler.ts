import { IHandlerParameters } from "@brightside/imperative";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectService } from "../../../api/service/ZosConnectService";
import { ZosConnectBaseHandler } from "../../ZosConnectBaseHandler";

export default class ServiceListHandler extends ZosConnectBaseHandler {
    public async processCmd(commandParameters: IHandlerParameters): Promise<void> {
        try {
            const services = await ZosConnectService.list(this.session);
            commandParameters.response.format.output({
                fields: ["name", "description", "serviceProvider"],
                format: "table",
                output: services,
            });
            commandParameters.response.data.setObj(services);
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParameters.response.console.error("Security error, unable to display Services");
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
