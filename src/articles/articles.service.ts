import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategorieEntity } from 'src/categories/categories.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { CommentService } from 'src/comment/comment.service';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { ArticleEntity } from './articles.entity';

@Injectable()
export class ArticlesService {

    constructor (
        @InjectRepository(ArticleEntity)
        private readonly articleRepository : Repository<ArticleEntity>,
        private readonly categorieService : CategoriesService,
        @Inject(forwardRef(() => UserService))
        private readonly userService : UserService,
        @Inject(forwardRef(() => CommentService))
        private readonly commentService : CommentService

    ){}

    async getCount(): Promise<number>{
        return await this.articleRepository.count();
    }

    async getAll(): Promise<ArticleEntity[]>{
        return await this.articleRepository.find({
            relations : ['comments', 'auteur', 'categories'],
            order : {
                createdAt : 'DESC',
            }
        });
    }

    async getArticlesCountByUser( user : UserEntity) : Promise<number>{
        return await this.articleRepository.count({
            where : {
                auteur : user,
            }
        });
    }

    async getArticleByUser( user : UserEntity) : Promise<ArticleEntity[]>{
        return await this.articleRepository.find({
            relations : ['comments', 'categories'],
            order : {
                createdAt : 'DESC',
            },
            where : {
                auteur : user,
            }
        });
    } 
    
    async getArticlesCountByCategorie( categorie : CategorieEntity ): Promise<number>{
        const articlesCount = await this.articleRepository
            .createQueryBuilder('article')
            .innerJoin(' article.categories', 'categorie', 'categorie.id = categorieId', { categorieId : categorie.id})
            .getCount();

        return await articlesCount;
    }
    
}