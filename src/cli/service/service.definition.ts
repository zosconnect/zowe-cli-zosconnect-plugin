import { ICommandDefinition } from "@brightside/imperative";
import { DeleteDefinition } from "./delete/delete.definition";
import { InstallDefinition } from "./install/install.definition";
import { ListDefinition } from "./list/list.definition";
import { UpdateDefinition } from "./update/update.definition";

const serviceDefinition: ICommandDefinition = {
    name: "service",
    type: "group",
    description: "Manage z/OS Connect EE Services",
    children: [ListDefinition, InstallDefinition, DeleteDefinition, UpdateDefinition],
};

export = serviceDefinition;
