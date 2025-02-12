import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { FriendRequestsService } from './friend-requests.service';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request';
import { createFriendRequestDto } from './dto/create-friend-request.dto';


@Controller('friend-requests')
@UseGuards(JwtAccessGuard)
export class FriendRequestsController {
    constructor(
        private friendRequestService: FriendRequestsService
    ) { }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async create(@Body() createFriendRequestDto: createFriendRequestDto, @Req() req: AuthenticatedRequest, @Res() res: Response) {
        createFriendRequestDto.senderId = req.user.sub;
        const request = await this.friendRequestService.create(createFriendRequestDto);
        res.status(HttpStatus.CREATED).json(request);
    }
}
