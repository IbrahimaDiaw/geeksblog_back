import { ArticleEntity } from "../articles/articles.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categories')
export class CategorieEntity {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({ type: 'varchar', nullable:false, unique:true, length:300})
    nom : string;

    @CreateDateColumn({type : 'timestamp', default:()=> 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @UpdateDateColumn({ type: 'timestamp', default:()=> 'CURRENT_TIMESTAMP'})
    updatedAt : Date;

    @ManyToMany( type => ArticleEntity, article => article.categories)
    articles : ArticleEntity[];

}