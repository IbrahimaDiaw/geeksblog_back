import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG), ArticlesModule, CategoriesModule, UserModule, CommentModule],
  controllers: [AppController, CategoriesController],
  providers: [AppService],
})
export class AppModule {}
