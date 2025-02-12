import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PgClientService } from '../pg-client.service';
import { ConfigModule } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [UsersService, PgClientService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create user', async () => {
    const createUserDto: CreateUserDto = {
      firstName: 'Gagik',
      lastName: 'Hakobyan',
      age: 20,
      email: 'gag22@test.com',
      password: 'gagik2004'
    }
    const record = await service.create(createUserDto);
    expect(record).toEqual({
      "id": "e88ab229-fcd8-4f23-820e-24812ebd02cb",
      "firstName": "Gagik",
      "lastName": "Hakobyan",
      "age": 20,
      "email": "gag22@test.com",
      "password": "gagik2004",
      "createdAt": "2025-02-12T11:30:39.353Z",
      "updatedAt": null
    });
  }, 10000)
});
