import { IsDate, isDate, IsEmpty } from "class-validator";
import { CategorieEntity } from "src/categories/categories.entity";
import { CommentEntity } from "src/comment/comment.entity";
import { UserEntity } from "src/user/user.entity";

export class ArticleDTO {

    @IsEmpty()
    id : string;

    @IsEmpty()
    nom : string;

    @IsEmpty()
    contenu : string;

    published : boolean;

    views : number;

    @IsDate()
    createdAt : Date;

    @IsDate()
    updatedAt : Date;

    comments : CommentEntity[];

    auteur : UserEntity;

    categorieIds : CategorieEntity[];
    
}