import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TokensService } from 'src/tokens/tokens.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private tokenService: TokensService
    ) { }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const { id, email } = await this.usersService.create(createUserDto);
        const { refreshToken } = await this.tokenService.createOrUpdate({userId: id, refreshToken: 'dopeokp'});
        res.status(HttpStatus.CREATED).json({ id, email, refreshToken });
    }
}
