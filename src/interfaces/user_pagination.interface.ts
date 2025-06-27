import { IUser } from "./user.interface";

export interface ISupportInfo {
    url: string;
    text: string;
}

export interface IUserPagination {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: IUser[];
    support: ISupportInfo;
}