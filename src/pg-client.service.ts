import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as pg from 'pg'
const { Client } = pg;

@Injectable()
export class PgClientService extends Client implements OnModuleInit {
    constructor(private configService: ConfigService) {
        super({
            connectionString: configService.get<string>('DATABASE_URL')
        })
    }

    async onModuleInit() {
        await this.connect();
    }
}
