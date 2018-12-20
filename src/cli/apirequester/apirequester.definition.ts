import { ICommandDefinition } from "@brightside/imperative";
import { DeleteDefinition } from "./delete/delete.definition";
import { InstallDefinition } from "./install/install.definition";
import { ListDefinition } from "./list/list.definition";

const apiRequsterDefinition: ICommandDefinition = {
    name: "apirequester",
    type: "group",
    description: "Manage z/OS Connect EE API Requesters",
    children: [ListDefinition, InstallDefinition, DeleteDefinition],
};

export = apiRequsterDefinition;
