import { IsUUID } from "class-validator";

export class createFriendRequestDto {
    senderId: string;

    @IsUUID()
    receiverId: string;
}