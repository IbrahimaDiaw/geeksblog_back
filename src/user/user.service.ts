import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/articles/articles.entity';
import { ArticlesService } from 'src/articles/articles.service';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>,
        @Inject( forwardRef(() => ArticlesService))
        private readonly articleService : ArticlesService,
    ){}

    async getUsers() : Promise<UserEntity[]>{
        return await this.userRepository.find({
            order : {
                createdAt : 'DESC'
            }
        })
    }

    async getAuteurs() : Promise<UserEntity[]>{
        return await this.userRepository.find({
            where : {
                isAuteur : true,
            }
        })
    }

    async getUserByEmail( email : string ) : Promise<UserEntity>{
        return await this.userRepository.findOneOrFail({
            where : {
                email,
            }
        })
    }

    async getUserArticleByEmail( email : string) : Promise<ArticleEntity[]>{
        const user = await this.userRepository.findOneOrFail({
            where : {
                email
            }
        });

        return await this.articleService.getArticleByUser(user);
    }

    async getUserArticleCountByEmail( email : string ) : Promise<number>{
        const user = await this.userRepository.findOneOrFail({
            where : {
                email,
            }
        });

        return await this.articleService.getArticlesCountByUser(user);
    }

    async getUserByEmailAndPassword( email : string, password : string ) : Promise<UserEntity>{
        return await this.userRepository.findOneOrFail({
            email,
            password,
        })
    }

    async getUserById( id : string ) : Promise<UserEntity>{
        return await this.userRepository.findOneOrFail(id);
    }

    async createUser( user : UserEntity) : Promise<UserEntity>{
        return await this.userRepository.save(user);
    }

    async updateCreate( userId : string, user : UserEntity) : Promise<UserEntity>{
        await this.userRepository.findOneOrFail(userId);
        await this.userRepository.update(userId, user);

        return this.userRepository.findOneOrFail(userId); 
    }

    async deleteUser( userId : string ) : Promise<UserEntity>{
        const userDelete = await this.userRepository.findOneOrFail(userId);
        return await this.userRepository.remove(userDelete);
    }
}
