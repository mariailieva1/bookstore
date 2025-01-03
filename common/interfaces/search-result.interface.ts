import { IAuthor } from "./author.interface";
import { ICategory } from "./category.interface";
import { IProduct } from "./product.interface";
import { IPublisher } from "./publisher.interface";

export type SearchResultTypes = "product" | "category" | "author" | "publisher";

export interface ISearchResultBase<T extends SearchResultTypes> {
    name: string;
    type: T;
    exactMatch?: boolean;
}

export interface IProductSearchResult
    extends ISearchResultBase<"product">,
        IProduct {}

export interface ICategorySearchResult
    extends ISearchResultBase<"category">,
        ICategory {}

export interface IAuthorSearchResult
    extends ISearchResultBase<"author">,
        IAuthor {}

export interface IPublisherSearchResult
    extends ISearchResultBase<"publisher">,
        IPublisher {}

export type SearchResult =
    | IProductSearchResult
    | ICategorySearchResult
    | IAuthorSearchResult
    | IPublisherSearchResult;
