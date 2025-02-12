import { Module } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequestsController } from './friend-requests.controller';

@Module({
  providers: [FriendRequestsService],
  controllers: [FriendRequestsController]
})
export class FriendRequestsModule {}
