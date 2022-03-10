import { IUser } from './user.interface';

export interface IJobOffer {
    id: number;
    title: string;
    description: string;
    numOfLikes: number;
    type: 'part-time' | 'full-time' | 'remote';
    category: string;
    applied: IUser[];
    isActive: boolean;
    acceptedUser: IUser;
    postedById: number;
}
