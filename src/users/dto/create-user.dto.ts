import { IsEmail, IsInt, IsStrongPassword, MaxLength } from "class-validator";

export class CreateUserDto {
    @MaxLength(30, { message: 'Please enter your valid name under 30 characters.' })
    firstName: string;

    @MaxLength(30, { message: 'Please enter your valid surname under 30 characters.' })
    lastName: string;
    
    @IsInt()
    age: number;

    @IsEmail({}, { message: 'Please enter valid email address.' })
    email: string;

    @IsStrongPassword({ minLength: 8, minNumbers: 4, minUppercase: 1, minSymbols: 1 }, { message: 'Password must be at least 8 characters long, contain 4 digits, 1 symbol, 1 uppercase.' })
    password: string;
}