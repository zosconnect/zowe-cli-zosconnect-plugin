import { ICommandDefinition } from "@brightside/imperative";
import { ZosConnectSessionutils } from "../ZosConnectionSessionUtils";
import { DeleteDefinition } from "./delete/delete.definition";
import { InstallDefinition } from "./install/install.definition";
import { ListDefinition } from "./list/list.definition";
import { StartDefinition } from "./start/start.definition";
import { StopDefinition } from "./stop/stop.definition";
import { UpdateDefinition } from "./update/update.definition";

const serviceDefinition: ICommandDefinition = {
    name: "service",
    type: "group",
    description: "Manage z/OS Connect EE Services",
    children: [ListDefinition, InstallDefinition, DeleteDefinition, UpdateDefinition, StartDefinition, StopDefinition],
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
