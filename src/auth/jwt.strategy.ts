import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";





@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRespository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }
    async validate(payload) {
        const { id } = payload;
        const user = await this.userRespository.findOne({where:{id}});

        if(!user){
            throw new UnauthorizedException('Login first to acess the current endpoint')
        }
        return user;
    }
}
