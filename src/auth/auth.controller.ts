import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { TokensService } from 'src/tokens/tokens.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JWTPayload } from './interfaces/jwt-payload';
import { AuthenticatedRequest } from './interfaces/authenticated-request';

@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private configService: ConfigService
    ) { }

    @Post('signup')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const { id, email } = await this.usersService.create(createUserDto);
        const { accessToken, refreshToken } = await this.authService.generateTokens({ sub: id, email });
        res.cookie('refresh_token', refreshToken, { maxAge: this.configService.get('COOKIE_MAX_AGE'), httpOnly: true });
        res.status(HttpStatus.CREATED).json({ accessToken });
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: AuthenticatedRequest, @Res() res: Response) {
        const { accessToken, refreshToken } = await this.authService.generateTokens(req.user);
        res.cookie('refresh_token', refreshToken, { maxAge: this.configService.get('COOKIE_MAX_AGE'), httpOnly: true });
        res.status(HttpStatus.CREATED).json({ accessToken });
    }
}
