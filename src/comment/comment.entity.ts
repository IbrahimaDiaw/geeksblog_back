import { ArticleEntity } from "../articles/articles.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('comments')
export class CommentEntity{

    @PrimaryGeneratedColumn('uuid')
    id : string; 

    @Column({ type: 'text', nullable:false})
    message : string;

    @CreateDateColumn({ type : 'timestamp', default:()=> 'CURRENT_TIMESTAMP'})
    createdAt : Date;

    @UpdateDateColumn({ nullable: true})
    updatedAt : Date;

    @Column({ default: 'n/a'})
    auteur? : string;

    @Column({ default:0})
    likes : number;

    @Column({ default: 0})
    dislikes : number;

    @ManyToOne( type => ArticleEntity, article => article.comments)
    articles? : ArticleEntity;
}