import { ITrackedEntity } from "./tracked-entity.interface";

export interface IAddress extends ITrackedEntity {
    name?: string;
    country: string;
    city: string;
    addressLine: string;
    additionalAddressLine?: string;
    postCode: string;
    phoneNumber: string;
}
