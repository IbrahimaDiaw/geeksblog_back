import { Allow, IsDate, IsEmail, IsNotEmpty } from "class-validator";
import { ArticleEntity } from "src/articles/articles.entity";

export class UserDTO {
    @IsNotEmpty()
    id : string;
    
    @Allow()
    avatar : string;

    @IsNotEmpty()
    prenom : string;

    @IsNotEmpty()
    nom : string;

    @IsNotEmpty()
    @IsEmail()
    email : string;

    @Allow()
    password : string;

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