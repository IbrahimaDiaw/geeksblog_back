import { UserEntity } from "src/user/user.entity";

export class JwtToken {
    token : string;
    expiresIn : number;
    user? : UserEntity; 
}