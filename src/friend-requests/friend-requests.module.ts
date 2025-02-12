import { Module, ValidationPipe } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequestsController } from './friend-requests.controller';
import { PgClientService } from 'src/pg-client.service';

@Module({
  providers: [FriendRequestsService, PgClientService, ValidationPipe],
  controllers: [FriendRequestsController]
})
export class FriendRequestsModule {}
