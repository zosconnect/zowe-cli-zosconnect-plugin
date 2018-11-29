import { ICommandDefinition } from "@brightside/imperative";
import { ListDefinition } from "./list/list.definition";

const serviceDefinition: ICommandDefinition = {
    name: 'service',
    type: 'group',
    description: 'Manage z/OS Connect EE Services',
    children: [ListDefinition]
}

export = serviceDefinition;