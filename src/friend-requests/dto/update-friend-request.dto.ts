import { IsUUID } from "class-validator";

export class UpdateFriendRequestDto {
    @IsUUID()
    friendRequestId: string;

    accept: boolean;
}