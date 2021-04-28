import { CategorieEntity } from "../categories/categories.entity";
import { CommentEntity } from "../comment/comment.entity";
import { UserEntity } from "../user/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('articles')
export class ArticleEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({ type: 'varchar', nullable:false, length:300})
    titre : string;

    @Column({ type: 'text', nullable:false})
    contenu : string;

    @Column({ type : 'boolean', default:true})
    published : boolean;

    @Column({ default: 0})
    views : number;

    @CreateDateColumn({ type: 'timestamp', default:()=> 'CURRENT_TIMESTAMP'}) 
    createdAt : Date;

    @UpdateDateColumn({ type: 'timestamp'})
    updatedAt : Date;

    @OneToMany( type => CommentEntity, comment => comment.articles)
    comments? : CommentEntity[];

    @ManyToOne( type => UserEntity, user => user.articles)
    auteur? : UserEntity;

    @ManyToMany( type => CategorieEntity, categorie => categorie.articles)
    @JoinTable({ name: 'article_categories'})
    categories? : CategorieEntity[];
}