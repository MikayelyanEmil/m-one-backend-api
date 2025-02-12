import { Injectable } from '@nestjs/common';
import { PgClientService } from '../pg-client.service';
import { CreateUserResponse } from './interfaces/create-user-response';
import { CreateUserDto } from './dto/create-user.dto';
import { CREATE_USER } from './queries';

@Injectable()
export class UsersService {
    constructor(private pgClient: PgClientService) {}

    async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
        const {
            firstName,
            lastName,
            age,
            email,
            password
        } = createUserDto;
        const response = await this.pgClient.query(CREATE_USER,
            [firstName, lastName, age, email, password]
        );
        return response.rows[0];
    }
}
