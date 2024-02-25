// create-user.dto.ts

import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    readonly author: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    readonly secret: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    readonly email: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    readonly password: string;
}
