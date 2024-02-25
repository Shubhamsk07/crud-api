import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';

export class LoginDto {

    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' }) 
    readonly email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    readonly password: string;

   
}
