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

export const DeleteDefinition: ICommandDefinition = {
    name: "delete",
    description: "Delete an API",
    type: "command",
    handler: __dirname + "/delete.handler",
    positionals: [{
        name: "apiName",
        description: "The name of the API to delete.",
        type: "string",
        required: true,
    }],
    options: [{
        name: "force",
        type: "boolean",
        description: "Whether the API should be deleted regardless of status",
        aliases: ["f"],
    }],
    profile: {
        required: ["zosconnect"],
    },
};
