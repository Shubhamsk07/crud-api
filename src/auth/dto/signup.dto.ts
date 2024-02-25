import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';

export class SignUpDto {

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

    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' }) 
    readonly email: string;
}
