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

export const UpdateDefinition: ICommandDefinition = {
    name: "update",
    description: "Update an exisiting Service",
    type: "command",
    handler: __dirname + "/update.handler",
    positionals: [{
        name: "serviceName",
        description: "The name of the Service to update.",
        type: "string",
        required: true,
    },
    {
        name: "file",
        description: "The new SAR file for the Service",
        type: "string",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
