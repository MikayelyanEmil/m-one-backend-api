import { IsBoolean, IsUUID } from "class-validator";

export class UpdateFriendRequestDto {
    @IsUUID()
    friendRequestId: string;

    @IsBoolean()
    accept: boolean;
}