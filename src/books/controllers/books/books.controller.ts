import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { BookService } from '../../../books/services/books/books.service';
import { ErrorResponse, SuccessResponse } from '../../../utils/response.util';
import { CreateBookDto } from '../../../books/dtos/cresteBooks.dtos';
import { Response, Request } from 'express';
import AppError from '../../../shared/error';

@Controller('books')
export class BooksController {
    constructor(
        private readonly bookService: BookService
    ) {}


    @Get()
    async getAllBooks(@Req() req: Request, @Res() res: Response){
      try {
        const books = await this.bookService.findAll();
        return res.status(HttpStatus.OK).send(SuccessResponse("all books", books))
      } catch (error: any) {
        Logger.error({error})
        console.log(error)
        if(error instanceof AppError) return res.status(error.getStatus()).send(ErrorResponse(error.message));
        return ErrorResponse(error)
      }
    }

    @Post("/add")
    async addBooks(@Req() req: Request, @Res() res: Response){
        try {
            const response = await this.bookService.addBook(req.body)
            
            return res.status(HttpStatus.CREATED).send(SuccessResponse("book added to shelf successfully", response))
        } catch (error) {
            Logger.error({error})
            if(error instanceof AppError) return res.status(error.getStatus()).send(ErrorResponse(error.message));
            return ErrorResponse(error)
        }
    }

    @Get(":id")
    async getBook(@Param() id, @Res() res: Response){
        try {
            const response = await this.bookService.findById(id)

            return res.status(HttpStatus.OK).send(SuccessResponse("book item returned sucessfully", response))
        } catch (error) {
            Logger.error({error})
            return ErrorResponse(error)
        }
    }

    @Delete("/delete/:id")
    async deleteBook(@Req() req: Request, @Res() res: Response){
        try {
            const {id} = req.params
            await this.bookService.removeBook(id)
            return res.status(HttpStatus.OK).send(SuccessResponse("Deleted succesfully", null))
        } catch (error) {
            Logger.error(error.message)
            console.log(error)
            if(error instanceof AppError) return res.status(error.getStatus()).send(ErrorResponse(error.message));
            return ErrorResponse(error)
        }
    }

    @Patch("/update/:id")
    async updateBook(@Req() req: Request, @Res() res: Response, @Body() updatebooks: CreateBookDto){
        try {
            const {id} = req.params
            await this.bookService.updateBook(id, updatebooks)

            return res.status(HttpStatus.OK).send(SuccessResponse("book record updated successfully", null))
        } catch (error) {
            Logger.error({error})
            console.log(error)
            if(error instanceof AppError) return res.status(error.getStatus()).send(ErrorResponse(error.message));
            return ErrorResponse(error)
        }
    }
}
