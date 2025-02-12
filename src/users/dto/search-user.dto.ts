import { IsInt, IsOptional, MaxLength } from "class-validator";

export class SearchUserDto {
    @IsOptional()
    @MaxLength(30, { message: 'Please enter valid name under 30 characters.' })
    firstName?: string;

    @IsOptional()
    @MaxLength(30, { message: 'Please enter valid surname under 30 characters.' })
    lastName?: string;

    @IsOptional()
    @IsInt()
    age?: number;
}