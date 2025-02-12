import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { PgClientService } from 'src/pg-client.service';

@Module({
  providers: [TokensService, PgClientService],
  exports: [TokensService]
})
export class TokensModule {}
