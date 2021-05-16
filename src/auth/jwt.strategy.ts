import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    
    constructor(private readonly authService : AuthService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env.SECRETKEY, 
        })
    }

    async validate(payload: JwtPayload) {
        try {
          return await this.authService.validateUserByJwt(payload);
        } catch (err) {
          throw new UnauthorizedException();
        }
      }
}