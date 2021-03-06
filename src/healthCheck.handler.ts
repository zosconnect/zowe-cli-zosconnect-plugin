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

import { ICommandHandler, IHandlerParameters } from "@zowe/imperative";

export default class HealthCheckHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        // do nothing here, just to prevent a warning on install
    }
}
