import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Books } from '../../../typeorm/entities/books.entity';
import { bookType } from '../../../books/types/book.types';
import Managers from '../../../typeorm/entities/managers.entity';
import AppError from '../../../shared/error';

@Injectable()
export class BooksService {
    constructor(private readonly booksrepository: Repository<Books>,
                private readonly managerRepository: Repository<Managers>){}
    //perfoem basic CRUD
    // find
    // findById
    // create
    // update
    // delete
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

            if(!isManager) throw new AppError(HttpStatus.UNAUTHORIZED, "You are not permited to add book items")

            const data = await this.booksrepository.save(payload)
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

            await this.booksrepository.delete(id)
        } catch (error) {
            throw error
        }
    }
}
