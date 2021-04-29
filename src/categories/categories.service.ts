import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CategorieDTO } from './categorie.dto';
import { CategorieEntity } from './categories.entity';

@Injectable()
export class CategoriesService {

    constructor( 
        @InjectRepository(CategorieEntity) 
        private readonly categorieRepository: Repository<CategorieEntity>
    ){}

    async getCount(): Promise<number>{
        return await this.categorieRepository.count({});
    }

    async getAll(): Promise<CategorieEntity[]>{
        return await this.categorieRepository.find({
            order:{
                createdAt: 'DESC'
            }
        });
    }

    async getCategorieById(id : string): Promise<CategorieEntity>{
        return await this.categorieRepository.findOneOrFail(id,{
            relations:['articles'],
        });
    }
    
    async create( categorieCreate: CategorieEntity): Promise<CategorieEntity>{
        return await this.categorieRepository.save(categorieCreate);
    }

    async update(categoryId: string, categorieDto: CategorieDTO): Promise<CategorieEntity> {
        await this.categorieRepository.findOneOrFail(categoryId);
        const categorieDtoWithPayload: CategorieEntity = {
          ...categorieDto,
        };
        await this.categorieRepository.update(categoryId, categorieDtoWithPayload);
        return await this.categorieRepository.findOneOrFail(categoryId);
      }
    async remove( id : string ) : Promise<CategorieEntity>{
        const categorie = await this.categorieRepository.findOneOrFail(id);
        return this.categorieRepository.remove(categorie);
    }
}
