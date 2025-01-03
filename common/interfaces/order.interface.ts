import { IAddress } from "./address.interface";
import { IProduct } from "./product.interface";
import { ITrackedEntity } from "./tracked-entity.interface";
import { IUser } from "./user.interface";

export interface IOrder extends ITrackedEntity {
    id: number;
    checkoutSessionId: string;
    address: IAddress;
    user?: IUser;
}
