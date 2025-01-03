import { ICategory } from "./category.interface";
import { ITrackedEntity } from "./tracked-entity.interface";

export interface IDepartment extends ITrackedEntity {
    id: number;
    name: string;
    description: string;
    categories?: ICategory[];
}
