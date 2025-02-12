import { Injectable } from '@nestjs/common';
import { PgClientService } from 'src/pg-client.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { CREATE_TOKEN, UPSERT_TOKEN } from './queries';
import { CreateTokenResponse } from './interfaces/create-token-response';

@Injectable()
export class TokensService {
    constructor(private pgClient: PgClientService) {}

    async createOrUpdate(createTokenDto: CreateTokenDto): Promise<CreateTokenResponse> {
        const response = await this.pgClient.query(UPSERT_TOKEN, [createTokenDto.userId, createTokenDto.refreshToken]);
        return response.rows[0];
    }
}
