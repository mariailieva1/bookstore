export interface IBreadcrumbItem {
    name: string;
    link?: string | string[];
    queryParams?: { [key: string]: any };
}
