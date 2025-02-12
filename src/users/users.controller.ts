import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { UsersService } from './users.service';
import { SearchUserDto } from './dto/search-user.dto';
import { Response } from 'express';

@Controller('users')
@UseGuards(JwtAccessGuard) // Lets only authenticated users to access with their jwts
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('search') // Search by combination of first name, last name and age
    @UsePipes(new ValidationPipe({transform: true, whitelist: true})) // validate search terms. 
    async search(@Body() searchUserDto: SearchUserDto, @Res() res: Response) {
        const users = await this.usersService.search(searchUserDto);
        if (users.length) res.status(HttpStatus.OK).json(users);
        else res.sendStatus(HttpStatus.NOT_FOUND);
    }
}
