import { Allow, IsDate, IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ArticleEntity } from "src/articles/articles.entity";

export class LoginDTO{

    @IsNotEmpty()
    id : string;
    
    @IsNotEmpty()
    username? : string;

    @Allow()
    avatar? : string;

    @IsNotEmpty()
    @IsEmail()
    email? : string;

    @MinLength(6)
    password? : string;

    @IsNotEmpty()
    prenom : string;

    @IsNotEmpty()
    nom : string;

    @Allow()
    isAuteur : boolean;

    @Allow()
    isAdmin : boolean;

    @IsDate()
    createdAt : Date;

    @IsDate()
    updatedAt : Date;

    articles : ArticleEntity[];
    
}