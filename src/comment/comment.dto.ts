import { IsNotEmpty } from "class-validator";
import { ArticleEntity } from "src/articles/articles.entity";

export class CommentDTO {
    
    @IsNotEmpty()
    id : string;

    @IsNotEmpty()
    message : string;

    createdAt : Date;

    updatedAt : Date;

    auteur : string;

    likes : number;

    dislikes : number;

    articles : ArticleEntity;
}