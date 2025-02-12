import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokensModule } from 'src/tokens/tokens.module';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, TokensModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService]
})
export class AuthModule {}
