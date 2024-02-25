import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async signup(signUpDto: SignUpDto): Promise<{ token: string, user: User }> {
        const { username, email, password } = signUpDto;

        

        const user = this.userRepository.create({
            username,
            email,
            password: password

        })
        

        // Sign the JWT token with the user's id in the payload
        const token = this.jwtService.sign({ id: user.id });

        // Return both the token and the user object
        return { token, user: user };
    }
    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({where:{email}})

        if(!user){
            
            throw new UnauthorizedException('Invalid email or password')
            
            
        }
        

        if(user.password!=password){
            
            throw new UnauthorizedException('Invalid email or password')
        }
        const token = this.jwtService.sign({ id: user.id });

        
        return { token };
    }

    
}
