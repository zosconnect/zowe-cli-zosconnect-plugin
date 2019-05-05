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

import { ICommandDefinition } from "@brightside/imperative";

export const DeleteDefinition: ICommandDefinition = {
    name: "delete",
    description: "Delete a Service",
    type: "command",
    handler: __dirname + "/delete.handler",
    positionals: [{
        name: "serviceName",
        description: "The name of the Service to delete",
        type: "string",
        required: true,
    }],
    options: [{
        name: "force",
        type: "boolean",
        description: "Delete the Service regardless of status.",
        aliases: ["f"],
    }],
    profile: {
        required: ["zosconnect"],
    },
};
