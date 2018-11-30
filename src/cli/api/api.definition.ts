import { ICommandDefinition } from "@brightside/imperative";
import { DeleteDefinition } from "./delete/delete.definition";
import { InstallDefinition } from "./install/install.definition";
import { ListDefinition } from "./list/list.definition";
import { UpdateDefinition } from "./update/update.definition";

const apiDefinition: ICommandDefinition = {
    name: "api",
    type: "group",
    description: "Manage z/OS Connect EE APIs",
    children: [InstallDefinition, UpdateDefinition, DeleteDefinition, ListDefinition],
};

export = apiDefinition;
