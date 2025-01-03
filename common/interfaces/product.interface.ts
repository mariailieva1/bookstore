import { ICategory } from "./category.interface";
import { IAuthor } from "./author.interface";
import { IPublisher } from "./publisher.interface";
import { ITrackedEntity } from "./tracked-entity.interface";
import { IImage } from "./image.interface";
import { IReview } from "./review.interface";

export interface IProduct extends ITrackedEntity {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    stock_quantity: number;
    category?: ICategory;
    author: IAuthor;
    publisher: IPublisher;
    images: IImage[];
    reviews?: IReview[];
}
