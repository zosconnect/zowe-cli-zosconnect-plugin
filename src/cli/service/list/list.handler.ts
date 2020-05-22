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

export default class ServiceListHandler extends ZosConnectBaseHandler {
    public async processCmd(commandParameters: IHandlerParameters): Promise<void> {
        try {
            const services = await ZosConnectService.list(this.session);
            if (services.length === 0) {
                commandParameters.response.console.log("No Services installed.");
            } else {
                commandParameters.response.format.output({
                    fields: ["name", "description", "serviceProvider"],
                    format: "table",
                    output: services,
                });
            }
            commandParameters.response.data.setObj(services);
        } catch (error) {
            switch (error.constructor) {
                case HTTPError:
                    switch (error.response.statusCode) {
                        case 401:
                        case 403:
                            commandParameters.response.console.error("Security error, unable to display Services");
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
