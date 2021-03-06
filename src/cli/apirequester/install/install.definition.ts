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

export const InstallDefinition: ICommandDefinition = {
    name: "install",
    description: "Install a new API Requester",
    type: "command",
    handler: __dirname + "/install.handler",
    positionals: [{
        name: "file",
        type: "string",
        description: "The ARA file to install",
        required: true,
    }],
    profile: {
        required: ["zosconnect"],
    },
};
