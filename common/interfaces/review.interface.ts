import { IProduct } from "./product.interface";
import { ITrackedEntity } from "./tracked-entity.interface";
import { IUser } from "./user.interface";

export interface IReview extends ITrackedEntity {
    user: IUser;
    rating: number;
    comment: string;
    product: IProduct;
}
