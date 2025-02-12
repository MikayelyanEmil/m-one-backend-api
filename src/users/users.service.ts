import { Injectable } from '@nestjs/common';
import { PgClientService } from '../pg-client.service';
import { User } from './interfaces/create-user-response';
import { CreateUserDto } from './dto/create-user.dto';
import { CREATE_USER, FIND_USER_BY_EMAIL } from './queries';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private pgClient: PgClientService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const {
            firstName,
            lastName,
            age,
            email,
            password
        } = createUserDto;
        const response = await this.pgClient.query(CREATE_USER,
            [firstName, lastName, age, email, bcrypt.hashSync(password, 10)]
        );
        return response.rows[0];
    }

    async findByEmail(email: string): Promise<User> {
        const response = await this.pgClient.query(FIND_USER_BY_EMAIL, [email]);
        return response.rows[0];
    }
}
