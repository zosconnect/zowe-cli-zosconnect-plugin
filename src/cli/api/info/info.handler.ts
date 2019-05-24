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

export default class ApiInfoHandler extends ZosConnectBaseHandler {
    public async processCmd(commandParameters: IHandlerParameters): Promise<void> {
        try {
            const api = await ZosConnectApi.info(this.session, commandParameters.arguments.apiName);
            commandParameters.response.format.output({
                fields: ["name", "version", "description", "services", "status"],
                format: "object",
                output: api,
            });
        } catch (error) {
            switch (error.constructor) {
                case StatusCodeError:
                    const statusCodeError = error as StatusCodeError;
                    switch (statusCodeError.statusCode) {
                        case 401:
                        case 403:
                            commandParameters.response.console.error(
                                "Security error occurred when trying to access the API");
                            break;
                        case 404:
                            commandParameters.response.console.error(
                                `API ${commandParameters.arguments.apiName} is not installed.`);
                            break;
                        default:
                            commandParameters.response.console.error(statusCodeError.message);
                    }
                    break;
                case RequestError:
                    commandParameters.response.console.error(
                        `Unable to connect to ${this.session.address} - ${error.message}`);
                    break;
                default:
                    commandParameters.response.console.error(error);
            }
        }
    }
}
