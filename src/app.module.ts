import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { PgClientService } from './pg-client.service';
import { ConfigModule } from '@nestjs/config';
import { FriendRequestsModule } from './friend-requests/friend-requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule, AuthModule, TokensModule, FriendRequestsModule],
  controllers: [AppController],
  providers: [AppService, PgClientService],
})
export class AppModule { }
