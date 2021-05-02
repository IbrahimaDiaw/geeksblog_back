import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategorieEntity } from 'src/categories/categories.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { CommentService } from 'src/comment/comment.service';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { ArticleDTO } from './articles.dto';
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

    async getArticlesByCategorie( categorie : CategorieEntity) : Promise<ArticleEntity[]>{
        const articles = await this.articleRepository
            .createQueryBuilder('article')
            .leftJoinAndSelect('article.auteur', 'user', 'user.id = article.auteur') // n->1 relation
            .leftJoinAndSelect('article.comments', 'comment', 'comment.article = article.id') //1->n relation
            .innerJoinAndSelect('article.categories', 'categorie', 'categorie.id = :categorieID',{
                    categorieID : categorie.id
            })
            .orderBy('article.createdAt', 'DESC')
            .getMany();

        return articles;
    }

    async getArticlesCountByAuteur(auteur : UserEntity): Promise<number>{
        const articlesCount = await this.articleRepository.count({
            where:{
                auteur,
            },
        })

        return articlesCount;
    }

    async getArticlesByAuteur( auteur : UserEntity) : Promise<ArticleEntity[]>{
        const articles = await this.articleRepository.find({
            where:{
                auteur
            },
            order:{
                createdAt: 'DESC'
            },
            relations: ['comments', 'categories', 'auteur']
        });

        return articles;
    }

    async getArticleById( article : string ) : Promise<ArticleEntity>{
        return await this.articleRepository.findOneOrFail(article,{
            relations: ['comments', 'categories', 'auteur']
        });
    }


    async createArticle ( articleDTO : ArticleDTO) : Promise<ArticleEntity>{
         const articleCreate : ArticleEntity = { ...articleDTO };
         articleCreate.categories = await this.categorieIdsToEntities(articleDTO.categorieIds);

        return await this.articleRepository.save(articleCreate);
    }


    async updateArticle( articleId : string, articleDTO : ArticleDTO) : Promise<ArticleEntity>{
        await this.articleRepository.findOneOrFail(articleId);
        const categoriesIds = { ...articleDTO.categorieIds};
        delete articleDTO.categorieIds;

        const articleConnect : ArticleEntity = {
            updatedAt : new Date(),
            ...articleDTO
        };
        await this.articleRepository.update(articleId, articleConnect);
        const articleUpdate = await this.articleRepository.findOneOrFail(articleId);
        articleUpdate.categories = await this.categorieIdsToEntities(categoriesIds);

        return await this.articleRepository.save(articleUpdate);
    }

    
    async deleteArticle( articleId : string ): Promise<ArticleEntity>{
        const article = await this.articleRepository.findOneOrFail(articleId,{
            relations: ['comments']
        });
        for(const comment of article.comments){
            //await this.commentService.deleteComment(comment);
        }

        return this.articleRepository.remove(article);
    }

    private async  categorieIdsToEntities(categorieIDs : string[]) : Promise<CategorieEntity[]>{
        const entities : CategorieEntity[] = [];
        for( const categorieID of categorieIDs){
            const entity = await this.categorieService.getCategorieById(categorieID);
            entities.push(entity);
        }

        return entities;
    }
    
}