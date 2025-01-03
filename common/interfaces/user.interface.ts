import { IAddress } from "./address.interface";
import { IOrder } from "./order.interface";
import { ITag } from "./tag.interface";
import { ITrackedEntity } from "./tracked-entity.interface";

export interface IUser extends ITrackedEntity {
    id: number;
    name: string;
    email: string;
    password?: string;
    addresses?: IAddress[];
    orders?: IOrder[];
    isAdmin: boolean;
    tags?: ITag[];
}
