import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TokensService } from 'src/tokens/tokens.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const { id, email } = await this.usersService.create(createUserDto);
        const { accessToken, refreshToken } = await this.authService.generateTokens({ sub: id, email });
        res.status(HttpStatus.CREATED).json({ id, email, accessToken, refreshToken });
    }
}
