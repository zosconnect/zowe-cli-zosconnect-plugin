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
import fs = require("fs");
import { HTTPError } from "got";
import { ZosConnectApiRequester } from "../../../api/apirequester/ZosConnectApiRequester";
import { ZosConnectBaseHandler } from "../../ZosConnectBaseHandler";

export default class ApiRequesterUpdateHander extends ZosConnectBaseHandler {
    public async processCmd(commandParameters: IHandlerParameters) {
        const filePath = commandParameters.arguments.file;
        let fileBuf;
        try {
            fileBuf = fs.readFileSync(filePath);
        } catch (error) {
            commandParameters.response.console.error(`Unable to load ARA file (${error.message})`);
            return;
        }

        try {
            const apiRequester = await ZosConnectApiRequester.update(this.session,
                commandParameters.arguments.apiRequesterName, fileBuf);
            commandParameters.response.console.log("Successfully updated API Requester" + apiRequester.name);
        } catch (error) {
            switch (error.constructor) {
                case(HTTPError):
                    switch (error.response.statusCode) {
                        case 400:
                            commandParameters.response.console.error("Invalid ARA file specified");
                            break;
                        case 401:
                        case 403:
                            commandParameters.response.console.error("Security error, API Requester was not updated");
                            break;
                        case 404:
                            commandParameters.response.console.error(
                                `API Requester ${commandParameters.arguments.apiRequesterName} is not installed.`);
                            break;
                        case 409:
                            commandParameters.response.console.error(
                                "Unable to update API Requester, it conflicts with an existing API Requester");
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
