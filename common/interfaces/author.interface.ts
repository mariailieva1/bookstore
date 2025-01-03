import { IProduct } from "./product.interface";
import { ITrackedEntity } from "./tracked-entity.interface";

export interface IAuthor extends ITrackedEntity {
    id: number;
    name: string;
    products?: IProduct[];
}
