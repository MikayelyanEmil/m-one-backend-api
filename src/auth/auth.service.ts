import { Injectable } from '@nestjs/common';
import { JWTPayload } from './interfaces/jwt-payload';
import { ConfigService } from '@nestjs/config';
import { TokensService } from 'src/tokens/tokens.service';
import { JwtService } from '@nestjs/jwt';
import { AuthTokens } from './interfaces/auth-tokens';

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private tokensService: TokensService,
        private jwtService: JwtService
    ) {}

    async generateTokens(payload: JWTPayload): Promise<AuthTokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRY')
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRY')
            })
        ]);
        await this.tokensService.createOrUpdate({userId: payload.sub, refreshToken});
        return {
            accessToken, refreshToken
        }
    }
}
