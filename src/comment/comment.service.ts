import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesService } from 'src/articles/articles.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CommentDTO } from './comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {

    constructor( 
        @InjectRepository(CommentEntity)
        private readonly commentRepository : Repository<CommentEntity>,
        @Inject(forwardRef(()=> ArticlesService))
        private readonly articleService : ArticlesService,
        @Inject (forwardRef(() => UserService))
        private readonly userService : UserService

        ){}

       async getCommentByArticle( articleId : string) : Promise<CommentEntity[]>{
           const article = await this.articleService.getArticleById(articleId);
           if( article){
               return article.comments;
           }
       }

       async getCommentById( commentId : string ) : Promise<CommentEntity>{
           return await this.commentRepository.findOneOrFail(commentId,{
               relations : ['article'],
           });

       }

       async createComment( articleId : string, commentDto : CommentDTO ) : Promise<CommentEntity>{

            const article = await this.articleService.getArticleById(articleId);
            const comment = new CommentEntity();

            comment.articles = article;
            comment.message = commentDto.message;

            const commentCreate = await this.commentRepository.save(comment);
            return this.getCommentById(commentCreate.id);
       } 
}
