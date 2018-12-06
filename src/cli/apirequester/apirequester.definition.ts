import { ICommandDefinition } from "@brightside/imperative";
import { ListDefinition } from "./list/list.definition";

const apiRequsterDefinition: ICommandDefinition = {
    name: "apirequester",
    type: "group",
    description: "Manage z/OS Connect EE API Requesters",
    children: [ListDefinition],
};

export = apiRequsterDefinition;
