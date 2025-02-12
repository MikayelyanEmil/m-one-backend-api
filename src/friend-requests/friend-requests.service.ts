import { Injectable } from '@nestjs/common';
import { PgClientService } from 'src/pg-client.service';
import { createFriendRequestDto } from './dto/create-friend-request.dto';
import { CREATE_FRIENDREQUEST, GET_PENDING_REQUESTS, UPDATE_FRIENDREQUEST } from './queries';
import { FriendRequest } from './interfaces/FriendRequest';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';

@Injectable()
export class FriendRequestsService {
    constructor(
        private pgClient: PgClientService
    ) { }

    async getPending(userId: string): Promise<FriendRequest[]> {
        const response = await this.pgClient.query(GET_PENDING_REQUESTS, [userId]);
        return response.rows;
    }

    async create(createFriendRequestDto: createFriendRequestDto): Promise<FriendRequest> {
        const { senderId, receiverId } = createFriendRequestDto;
        const response = await this.pgClient.query(CREATE_FRIENDREQUEST, [senderId, receiverId]);
        return response.rows[0];
    }

    async update(updateFriendRequestDto: UpdateFriendRequestDto): Promise<FriendRequest> {
        const { friendRequestId, accept } = updateFriendRequestDto;
        const status = accept ? 'ACCEPTED' : 'DECLINED';
        const response = await this.pgClient.query(UPDATE_FRIENDREQUEST, [status, friendRequestId]);
        return response.rows[0];
    }
}
