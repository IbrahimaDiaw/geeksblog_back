import { ArticleEntity } from "../articles/articles.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({ type: 'varchar', length:300})
    prenom: string;

    @Column({ type: 'varchar', length:300})
    nom: string;

    @OneToMany( type => ArticleEntity, article => article.auteur)
    articles? : ArticleEntity[];
}