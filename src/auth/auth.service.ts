import { Injectable } from '@nestjs/common';
import { JWTPayload } from './interfaces/jwt-payload';
import { ConfigService } from '@nestjs/config';
import { TokensService } from 'src/tokens/tokens.service';
import { JwtService } from '@nestjs/jwt';
import { AuthTokens } from './interfaces/auth-tokens';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private tokensService: TokensService,
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

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
        await this.tokensService.createOrUpdate({ userId: payload.sub, refreshToken });
        return {
            accessToken, refreshToken
        }
    }


    async validateUser(email: string, password: string): Promise<JWTPayload | null> {
        const user = await this.usersService.findByEmail(email);
        let payload: JWTPayload;
        if (user && await bcrypt.compare(password, user.password)) {
            payload = { sub: user.id, email: user.email };
            return payload;
        }
        return null;
    }
}
