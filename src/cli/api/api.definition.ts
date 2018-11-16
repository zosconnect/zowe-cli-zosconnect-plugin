import { ICommandDefinition } from "@brightside/imperative";
import { InstallDefinition } from "./install/install.definition";
import { UpdateDefinition } from "./update/update.definition";
import { DeleteDefinition } from "./delete/delete.definition";
import { ListDefinition } from "./list/list.definition";

const apiDefinition: ICommandDefinition = {
    name: 'api',
    type: 'group',
    description: 'Manage Inbound APIs',
    children: [InstallDefinition, UpdateDefinition, DeleteDefinition, ListDefinition]
}

export = apiDefinition;