export interface FriendRequest {
    id: string;
    status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
    senderId: string;
    receiverId: string;
    createdAt: string;
    updatedAt: string;
}