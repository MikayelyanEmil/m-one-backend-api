import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { FriendRequestsService } from './friend-requests.service';
import { Response } from 'express';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request';
import { createFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';


@Controller('friend-requests')
@UseGuards(JwtAccessGuard) // Lets only authenticated users to access with their jwts
export class FriendRequestsController {
    constructor(
        private friendRequestService: FriendRequestsService
    ) { }

    @Get('pending')
    async getPending(@Req() req: AuthenticatedRequest) {
        const requests = await this.friendRequestService.getPending(req.user.sub);
        console.log(requests);
        return requests;
    }

    @Post('create') // send friend request
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true })) // validates receiverId to be UUID
    async create(@Body() createFriendRequestDto: createFriendRequestDto, @Req() req: AuthenticatedRequest, @Res() res: Response) {
        createFriendRequestDto.senderId = req.user.sub; // assign the login user's id as senderId
        const request = await this.friendRequestService.create(createFriendRequestDto);
        res.status(HttpStatus.CREATED).json(request);
    }

    @Post('update') // accept or deny friend request 
    @UsePipes(new ValidationPipe({transform: true, whitelist: true})) // validates friendRequestId and accept properties
    async update(@Body() updateFriendRequestDto: UpdateFriendRequestDto, @Req() req: AuthenticatedRequest, @Res() res: Response) {
        const request = await this.friendRequestService.update(updateFriendRequestDto);
        res.status(HttpStatus.OK).json(request);
    }
}
