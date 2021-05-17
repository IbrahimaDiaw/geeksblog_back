import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './Auth.entity';
import { JwtPayload } from './jwt.payload';
import { JwtToken } from './jwt.token';
import * as bcrypt from 'bcrypt';
import { PasswordDTO } from './password.dto';


@Injectable()
export class AuthService {

    public constructor(
        
        private readonly userService : UserService,
        private jwtServie : JwtService,
    ){}

    public async sigin( userLogin : LoginDTO) : Promise<JwtToken>{

        const newUser :UserEntity = {
            ...userLogin,
            email : userLogin.email.toLowerCase(),
        }

        newUser.password = await bcrypt.hash(userLogin.password, await bcrypt.genSalt());
        const userCreate = await this.userService.createUser(newUser);
        const userInfo = await this.userService.getUserById(userCreate.id);
        return this.createJwtPayload(userInfo);

    }

    public async login(user: LoginDTO) : Promise<UserEntity> {
        user.email = user.email.toLowerCase();
        

        return    
    }

    // public async EditPassword( userId : string, passwords : PasswordDTO ){

    //     const user = await this.userService.getUserById(userId);
    //     // const login : LoginDTO = {
    //     //     email : user.email,
    //     //     password : passwords.password,
    //     // };

    //     //const verifiedUser = await this.validateUserByPassword(login);

    // }

    // private async validateUserByPassword(user: LoginDTO): Promise<UserEntity> {
    //     user.email = user.email.toLowerCase();
    //     const userToCheck = await this.userService.getOneUserSaltByEmail(user.email);
    //     const hashedPassword = await bcrypt.hash(user.password, userToCheck.salt);
    //     return await this.userService.getUserByEmailAndPassword(user.email, hashedPassword);
    //   }

    async validateUserByJwt(payload: JwtPayload) {
        const user = await this.userService.getUserByEmail(payload.email);
        return this.createJwtPayload(user);
      }

    createJwtPayload( user : UserEntity) : JwtToken{
        const data : JwtPayload = {
            email : user.email,
        }
        const jwt = this.jwtServie.sign(data);
        return{
            token : jwt,
            expiresIn : 3600,
            user,
        }
    }
}
