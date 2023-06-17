import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Books } from '../../../typeorm/entities/books.entity';
import { bookType } from '../../../books/types/book.types';
import Managers from '../../../typeorm/entities/managers.entity';
import AppError from '../../../shared/error';
import {UNAUTHORIZED, NOT_FOUND} from "httpstatus"
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../../typeorm/entities/user.entity';
import uuid from "uuid"

@Injectable()
export class BookService {
    constructor(
                @InjectRepository(Books)
                private readonly booksrepository: Repository<Books>){}

    async findById(id: string){
        try {
            const response = await this.booksrepository.findOne({
                where: {
                    id: id
                }
            })

            return response
        } catch (error) {
            console.log("error is", error.message)
            throw error
        }
    }

    async findAll(): Promise<Books[]> {
       try {
        return await this.booksrepository.find();
       } catch (error) {
        throw error
       }
      }
    

    async addBook(payload: bookType ){
        //add transaction for typeorm
        try {
            const exists = await this.booksrepository.findOne({
                where: {
                    title: payload.title
                },
            })

            if(exists) throw new AppError(HttpStatus.UNAUTHORIZED, "book with same title and author already exists")
            const data = await this.booksrepository.save(payload)
            console.log(data)
            return data
        } catch (error) {
            throw error
        }
    }

    async removeBook(id: string){
        //add trsnsaction here
        try {
            // check if book item exists in database
            const book = await this.booksrepository.findOne({
                where: {
                    id: id
                }
            })
            //delete book instance from db
            if(!book) throw new AppError(HttpStatus.NOT_FOUND, "book does not exist in the database.")

            await this.booksrepository.delete(id)
        } catch (error) {
            throw error
        }
    }

    async updateBook(id: string, payload: Partial<Books>){
        try {
        return await this.booksrepository.createQueryBuilder()
        .update({ ...payload })
        .where({id: id})
        .execute();
        } catch (error) {
            throw error
        }
    }
}
