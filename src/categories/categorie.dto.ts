import { IsNotEmpty} from 'class-validator';

export class CategorieDTO{
    
    @IsNotEmpty()
    nom : string;
}