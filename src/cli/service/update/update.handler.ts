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

import { IHandlerParameters } from "@brightside/imperative";
import fs = require("fs");
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectService } from "../../../api/service/ZosConnectService";
import { ZosConnectBaseHandler } from "../../ZosConnectBaseHandler";

export default class UpdateHandler extends ZosConnectBaseHandler {
    public async processCmd(commandParameters: IHandlerParameters): Promise<void> {
        const filePath = commandParameters.arguments.file;
        let fileBuf;
        try {
            fileBuf = fs.readFileSync(filePath);
        } catch (error) {
            commandParameters.response.console.error(`Unable to load SAR file (${error.message})`);
            return;
        }

        try {
            const service = await ZosConnectService.update(this.session, commandParameters.arguments.serviceName,
                fileBuf);
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
                default:
                    throw error;
            }
        }
    }
}
