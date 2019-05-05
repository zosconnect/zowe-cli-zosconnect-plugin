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

import { ICommandHandler, IHandlerParameters } from "@brightside/imperative";
import { ZosConnectSession } from "../ZosConnectSession";
import { ZosConnectSessionutils } from "./ZosConnectionSessionUtils";

export abstract class ZosConnectBaseHandler implements ICommandHandler {

    protected session: ZosConnectSession;

    public async process(commandParameters: IHandlerParameters) {
        const profile = commandParameters.profiles.get("zosconnect");
        this.session = ZosConnectSessionutils.createZosConnectSession(commandParameters.arguments);
        this.processCmd(commandParameters);
    }

    public abstract async processCmd(commandParameters: IHandlerParameters): Promise<void>;

}
