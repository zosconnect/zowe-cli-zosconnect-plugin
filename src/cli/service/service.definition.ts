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
import { ZosConnectSessionutils } from "../ZosConnectionSessionUtils";
import { DeleteDefinition } from "./delete/delete.definition";
import { InfoDefinition } from "./info/info.definition";
import { InstallDefinition } from "./install/install.definition";
import { ListDefinition } from "./list/list.definition";
import { StartDefinition } from "./start/start.definition";
import { StopDefinition } from "./stop/stop.definition";
import { UpdateDefinition } from "./update/update.definition";

const serviceDefinition: ICommandDefinition = {
    name: "service",
    type: "group",
    description: "Manage z/OS Connect EE Services",
    children: [ListDefinition, InstallDefinition, DeleteDefinition, UpdateDefinition,
               StartDefinition, StopDefinition, InfoDefinition],
    passOn: [
        {
            property: "options",
            value: ZosConnectSessionutils.ZCON_CONNECTION_OPTIONS,
            merge: true,
            ignoreNodes: [
                {type: "group"},
            ],
        },
    ],
};

export = serviceDefinition;
