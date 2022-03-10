export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    type: 'user' | 'company';
}
