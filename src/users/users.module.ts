import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PgClientService } from 'src/pg-client.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PgClientService]
})
export class UsersModule {}
