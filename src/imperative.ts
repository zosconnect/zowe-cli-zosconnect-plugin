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

import {IImperativeConfig} from "@brightside/imperative";

const config: IImperativeConfig = {
    commandModuleGlobs: ["**/cli/*/*.definition!(.d).*s"],
    rootCommandDescription: "z/OS Connect EE plugin for Zowe CLI",
    name: "zosconnect",
    profiles: [{
        type: "zosconnect",
        schema: {
            type: "object",
            title: "z/OS Connect EE Profile",
            description: "z/OS Connect EE connection profile",
            properties: {
                address: {
                    type: "string",
                    optionDefinition: {
                        description: "URI of the z/OS Connect EE server",
                        type: "string",
                        name: "address",
                        aliases: ["a"],
                        required: true,
                    },
                },
                user: {
                    type: "string",
                    optionDefinition: {
                        description: "User ID for accessing the server",
                        type: "string",
                        name: "user",
                        aliases: ["u"],
                        required: false,
                    },
                },
                password: {
                    type: "password",
                    optionDefinition: {
                        description: "Password for the User",
                        type: "string",
                        name: "password",
                        aliases: ["p"],
                        required: false,
                        implies: ["user"],
                    },
                },
                rejectUnauthorized: {
                    type: "boolean",
                    optionDefinition: {
                        description: "Reject self-signed certificates",
                        type: "boolean",
                        aliases: ["ru"],
                        name: "rejectUnauthorized",
                        required: false,
                        defaultValue: true,
                    },
                },
            },
            required: ["address"],
        },
    }],
    pluginHealthCheck: __dirname + "/healthCheck.handler",
};

export = config;
