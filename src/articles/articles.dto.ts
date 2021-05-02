import { IsBoolean, IsDate, IsDefined, IsEmpty, IsNumber } from "class-validator";
import { CommentEntity } from "src/comment/comment.entity";
import { UserEntity } from "src/user/user.entity";

export class ArticleDTO {

    @IsEmpty()
    id : string;

    @IsEmpty()
    titre : string;

    @IsEmpty()
    contenu : string;

    @IsBoolean()
    published : boolean;

    @IsNumber()
    views : number;

    @IsDate()
    createdAt : Date;

    @IsDate()
    updatedAt : Date;

    comments : CommentEntity[];

    auteur : UserEntity;

    @IsDefined()
    categorieIds? : string[];
    
}