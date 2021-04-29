import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CategorieEntity } from './categories.entity';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {

    constructor( private readonly categorieService : CategoriesService){}

    /**
     * Recuperer les nombre de categories existants
     */
    @Get('/nbrecategorie')
    public async getCount() {
        try {
            return await this.categorieService.getCount();
        } catch (error) {
           throw new HttpException(error, HttpStatus.NO_CONTENT); 
        }
    }

    /**
     * la liste toutes les categories
     */
    @Get("/")
    public async getAll(){
        try {
            return await this.categorieService.getAll();
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Details de la categorie
     */
    @Get("/:categorieID")
    public async getCategorieById(@Param('categorieID') categorieId : string ) {

        try {
            return await this.categorieService.getCategorieById(categorieId);
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
        
    }

    /**
     * creation de categorie
     */
    @Post("/create")
    public async create(@Body() categorie:CategorieEntity ) {

        try {
            return await this.categorieService.create(categorie);
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_ACCEPTABLE);
        }
        
    }

    /**
     * Mise a jour d'une categorie
     */
    @Put('/:categorieID')
    public async update( @Param('categorieID') categorieID : string, @Body() categorie : CategorieEntity ) {

        try {
            return await this.categorieService.update(categorieID, categorie);
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_ACCEPTABLE);
        }
        
    }

    /**
     * suppression d'un element
     */
    @Delete('/:categorieID/delete')
    public async deleteById( @Param('categorieID')  categorieID : string) {

        try {
            return await this.categorieService.remove(categorieID);
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
        
    }
}
