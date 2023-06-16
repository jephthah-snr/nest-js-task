import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Books } from '../../../typeorm/entities/books.entity';
import { bookType } from '../../../books/types/book.types';
import Managers from '../../../typeorm/entities/managers.entity';
import AppError from '../../../shared/error';
import {UNAUTHORIZED, NOT_FOUND} from "httpstatus"

@Injectable()
export class BooksService {
    constructor(private readonly booksrepository: Repository<Books>,
                private readonly managerRepository: Repository<Managers>){}
    async findById(id: string){
        try {
            const response = await this.booksrepository.findOne(id as any)

            return response
        } catch (error) {
            throw error
        }
    }

    async findAll(){
        try {
            const allBooks = await this.booksrepository.find();

            return allBooks
        } catch (error) {
            throw error
        }
    }

    async addBook(managerId: string, payload: bookType ){
        try {
            //check if user is manager
            const isManager = await this.managerRepository.findOne(managerId as any)

            if(!isManager) throw new AppError(UNAUTHORIZED, "You are not permited to add book items")

            const exists = await this.booksrepository.find({
                where: {
                    title: payload.title,
                    author: payload.author
                },
            })
            if(exists) throw new AppError(HttpStatus.UNAUTHORIZED, "book with same title and author already exists")
            const data = await this.booksrepository.save(payload)
            return data
        } catch (error) {
            throw error
        }
    }

    async removeBook(id: string, managerId: string){
        try {
            //check if user is manager
            const isManager = await this.managerRepository.findOne(managerId as any)

            if(!isManager) throw new AppError(HttpStatus.UNAUTHORIZED, "You are not permited to delete book items") 

            // check if book item exists in database
            const book = await this.booksrepository.findOne(id as any)

            if(!book) throw new AppError(HttpStatus.NOT_FOUND, "book does not exist in the database.")

            await this.booksrepository.delete(id)
        } catch (error) {
            throw error
        }
    }

    async updateBook(id: string, payload: bookType){
        try {
            const isPermitted = await this.managerRepository.find({where:{
                id: payload.managerID
            },
        })
        if(!isPermitted) throw new AppError(UNAUTHORIZED, "you do not have permission to update this record.")

        await this.booksrepository.update({id}, {...payload})
        } catch (error) {
            throw error
        }
    }
}
