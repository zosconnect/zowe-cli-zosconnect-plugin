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

export default class DeleteHandler extends ZosConnectBaseHandler {
    public async processCmd(commandParams: IHandlerParameters): Promise<void> {
        try {
            await ZosConnectService.delete(this.session, commandParams.arguments.serviceName,
                commandParams.arguments.force);
            commandParams.response.console.log(`Successfully deleted Service ${commandParams.arguments.serviceName}`);
        } catch (error) {
            switch (error.constructor) {
                case HTTPError:
                    switch (error.response.statusCode) {
                        case 401:
                        case 403:
                            commandParams.response.console.error(
                                "Security error occurred when trying to delete the Service");
                            break;
                        case 404:
                            commandParams.response.console.error(
                                `Service ${commandParams.arguments.serviceName} is not installed.`);
                            break;
                        case 409:
                            commandParams.response.console.error(
                                `Service ${commandParams.arguments.serviceName} is started.`);
                            break;
                        default:
                            commandParams.response.console.error(error.response.statusMessage);
                    }
                    break;
                default:
                    throw error;
            }
        }
    }
}
