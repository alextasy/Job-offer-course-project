export interface IJobOffer {
    id: number;
    title: string;
    description: string;
    numOfLikes: number;
    type: 'part-time' | 'full-time' | 'remote';
    category: string;
    applied: { id: number, message: string }[];
    isActive?: boolean;
    acceptedUserId?: number;
    postedById: number;
}
