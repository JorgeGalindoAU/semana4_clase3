export interface IUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface IUserJob {
    name: string;
    job: string;
}

export interface IUserCreated {
    id: number;
    name: string;
    job: string;
    createdAt: Date;
}