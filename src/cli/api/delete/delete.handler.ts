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
import { ZosConnectApi } from "../../../api/api/ZosConnectApi";
import { ZosConnectBaseHandler } from "../../ZosConnectBaseHandler";

export default class ApiDeleteHandler extends ZosConnectBaseHandler {
    public async processCmd(commandParams: IHandlerParameters) {
        try {
            await ZosConnectApi.delete(this.session, commandParams.arguments.apiName, commandParams.arguments.force);
            commandParams.response.console.log("Successfully deleted API " + commandParams.arguments.apiName);
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParams.response.console.error(
                                "Security error occurred when trying to delete the API");
                            break;
                        case 404:
                            commandParams.response.console.error(
                                `API ${commandParams.arguments.apiName} is not installed.`);
                            break;
                        case 409:
                            commandParams.response.console.error(
                                `API ${commandParams.arguments.apiName} is started.`);
                            break;
                        default:
                            commandParams.response.console.error(statusCodeError.message);
                    }
                    break;
                default:
                    throw error;
            }
        }
    }
}
