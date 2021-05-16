import { ArticleEntity } from "../articles/articles.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({ type : 'varchar', unique : true, length : 50})
    username? : string;

    @Column({ type: 'varchar', length:300})
    prenom: string;

    @Column({ type: 'varchar', length:300})
    nom: string;

    @Column({ default : '', type : 'text'})
    avatar? : string ;

    @Column({type: 'varchar', unique : true})
    email : string;

    @Column({ select : false})
    password? : string;
    
    @Column({ type : 'boolean', default : false })
    isAuteur? : boolean;

    @Column({ type : 'boolean', default : false})
    isAdmin? : boolean;

    @OneToMany( type => ArticleEntity, article => article.auteur)
    articles? : ArticleEntity[];

    @CreateDateColumn({ type : 'timestamp', default:() => 'CURRENT_TIMESTAMP'})
    createdAt? : Date;

    @UpdateDateColumn({ type : 'timestamp'})
    updatedAt : Date;
}