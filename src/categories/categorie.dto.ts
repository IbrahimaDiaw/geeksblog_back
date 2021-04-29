import { Allow, IsDate, IsNotEmpty} from 'class-validator';
import { ArticleEntity } from 'src/articles/articles.entity';

export class CategorieDTO{
    
    @IsNotEmpty()
    id : string;

    @IsNotEmpty()
    nom : string;

    @IsDate()
    createdAt : Date;

    @IsDate()
    updatedAt : Date;

    articles : ArticleEntity[];
}