import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ArticlesModule, CategoriesModule],
  controllers: [AppController, CategoriesController],
  providers: [AppService],
})
export class AppModule {}
