import { FiltersNames } from "./FiltersNames";
export interface Filter {    
    name: FiltersNames;
    label: string;
    active: boolean;     
}