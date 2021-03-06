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

import { ICommandDefinition } from "@zowe/imperative";

export const StopDefinition: ICommandDefinition = {
    name: "stop",
    description: "Set an API Requesters status to stopped",
    type: "command",
    handler: __dirname + "/stop.handler",
    positionals: [{
        name: "apiRequesterName",
        description: "The name of the API Requester to stop.",
        type: "string",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
