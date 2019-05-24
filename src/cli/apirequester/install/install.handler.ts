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
import { ZosConnectApiRequester } from "../../../api/apirequester/ZosConnectApiRequester";
import { ZosConnectBaseHandler } from "../../ZosConnectBaseHandler";

export default class ApiRequsterInstallHandler extends ZosConnectBaseHandler {
    public async processCmd(commandParameters: IHandlerParameters): Promise<void> {
        const filePath = commandParameters.arguments.file;
        let fileBuf;
        try {
            fileBuf = fs.readFileSync(filePath);
        } catch (error) {
            commandParameters.response.console.error(`Unable to load ARA file (${error.message})`);
            return;
        }

        try {
            const apiRequester = await ZosConnectApiRequester.install(this.session, fileBuf);
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
                        case 404:
                            commandParameters.response.console.error("API Requester feature is not enabled");
                            break;
                        case 409:
                            commandParameters.response.console.error(
                                "Unable to install API Requester, one with the same name is already installed");
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
