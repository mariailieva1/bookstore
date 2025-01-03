import { IProduct } from "./product.interface";
import { IDepartment } from "./department.interface";
import { ITrackedEntity } from "./tracked-entity.interface";

export interface ICategory extends ITrackedEntity {
    name: string;
    description: string;
    department: IDepartment;
    products?: IProduct[];
}
