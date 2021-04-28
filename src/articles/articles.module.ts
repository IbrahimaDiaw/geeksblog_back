import { forwardRef, Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './articles.entity';
import { CommentModule } from 'src/comment/comment.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    CategoriesModule,
    forwardRef(() => CommentModule),
    forwardRef(() => UserModule)
  ],
  providers: [ArticlesService],
  controllers: [ArticlesController],
  exports: [ArticlesService]
})
export class ArticlesModule {}
