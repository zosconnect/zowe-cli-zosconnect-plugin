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
import { ZosConnectApi } from "../../../api/api/ZosConnectApi";
import { ZosConnectBaseHandler } from "../../ZosConnectBaseHandler";

export default class ApiInstallHandler extends ZosConnectBaseHandler {
    public async processCmd(commandParameters: IHandlerParameters) {
        const filePath = commandParameters.arguments.file;
        let fileBuf;
        try {
            fileBuf = fs.readFileSync(filePath);
        } catch (error) {
            commandParameters.response.console.error(`Unable to load AAR file (${error.message})`);
            return;
        }

        try {
            const api = await ZosConnectApi.install(this.session, fileBuf);
            commandParameters.response.data.setObj(api);
            commandParameters.response.console.log("Successfully installed API " + api.name);
        } catch (error) {
            switch (error.constructor) {
                case HTTPError:
                    switch (error.response.statusCode) {
                        case 400:
                            commandParameters.response.console.error(
                                "Unable to install API, invalid AAR file specified");
                            break;
                        case 401:
                        case 403:
                            commandParameters.response.console.error("Security error, API was not installed");
                            break;
                        case 409:
                            commandParameters.response.console.error(
                                "Unable to install API, one with the same name is already installed");
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
