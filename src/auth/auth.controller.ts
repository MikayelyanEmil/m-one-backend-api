import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TokensService } from 'src/tokens/tokens.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private configService: ConfigService
    ) { }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const { id, email } = await this.usersService.create(createUserDto);
        const { accessToken, refreshToken } = await this.authService.generateTokens({ sub: id, email });
        res.cookie('refresh_token', refreshToken, { maxAge: this.configService.get('COOKIE_MAX_AGE'), httpOnly: true });
        res.status(HttpStatus.CREATED).json({ accessToken });
    }
}
