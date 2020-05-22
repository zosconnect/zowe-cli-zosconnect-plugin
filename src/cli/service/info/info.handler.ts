/*
 *  This program and the accompanying materials are made available under the terms of the
 *  Eclipse Public License v2.0 which accompanies this distribution, and is available at
 *  https://www.eclipse.org/legal/epl-v20.html
 *
 *  SPDX-License-Identifier: EPL-2.0
 *
 *  Copyright IBM 2019
 *
 */

import { IHandlerParameters } from "@zowe/imperative";
import { HTTPError } from "got";
import { ZosConnectService } from "../../../api/service/ZosConnectService";
import { ZosConnectBaseHandler } from "../../ZosConnectBaseHandler";

export default class ServiceInfoHandler extends ZosConnectBaseHandler {
    public async processCmd(commandParameters: IHandlerParameters): Promise<void> {
        try {
            const service = await ZosConnectService.info(this.session, commandParameters.arguments.serviceName);
            commandParameters.response.format.output({
                fields: ["name", "description", "serviceProvider", "invokeUrl", "status"],
                format: "object",
                output: service,
            });
            commandParameters.response.data.setObj(service);
        } catch (error) {
            switch (error.constructor) {
                case HTTPError:
                    switch (error.response.statusCode) {
                        case 401:
                        case 403:
                            commandParameters.response.console.error(
                                "Security error occurred when trying to access the Service");
                            break;
                        case 404:
                            commandParameters.response.console.error(
                                `Service ${commandParameters.arguments.serviceName} is not installed.`);
                            break;
                        default:
                            commandParameters.response.console.error(error.response.statusMessage);
                    }
                    break;
                default:
                    throw error;
            }
        }
    }
}
