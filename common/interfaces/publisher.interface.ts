import { IProduct } from "./product.interface";
import { ITrackedEntity } from "./tracked-entity.interface";

export interface IPublisher extends ITrackedEntity {
    id: number;
    name: string;
    products?: IProduct[];
}
