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
import { RequestError, StatusCodeError } from "request-promise/errors";
import { ZosConnectApiRequester } from "../../../api/apirequester/ZosConnectApiRequester";
import { ZosConnectBaseHandler } from "../../ZosConnectBaseHandler";

export default class ApiRequesterStopHandler extends ZosConnectBaseHandler {
    public async processCmd(commandParams: IHandlerParameters): Promise<void> {
        try {
            await ZosConnectApiRequester.stop(this.session, commandParams.arguments.apiRequesterName);
            commandParams.response.console.log(`Successfully stopped API Requester ` +
                `${commandParams.arguments.apiRequesterName}`);
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParams.response.console.error(
                                "Security error occurred when trying to stop the API Requester");
                            break;
                        case 404:
                            commandParams.response.console.error(
                                `API Requester ${commandParams.arguments.apiRequesterName} is not installed.`);
                            break;
                        default:
                            commandParams.response.console.error(statusCodeError.message);
                    }
                    break;
                case RequestError:
                    commandParams.response.console.error(
                        `Unable to connect to ${this.session.address} - ${error.message}`);
                    break;
                default:
                    commandParams.response.console.error(error);
            }
        }
    }
}
