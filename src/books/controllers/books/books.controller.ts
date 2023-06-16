import { Body, Controller, Delete, Get, HttpStatus, Logger, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { BookService } from '../../../books/services/books/books.service';
import { ErrorResponse, SuccessResponse } from '../../../utils/response.util';
import { CreateBookDto } from '../../../books/dtos/cresteBooks.dtos';
import { Response, Request } from 'express';

@Controller('books')
export class BooksController {
    constructor(
        private readonly bookService: BookService
    ) {}
        @Get()
        async getAllBooks(@Res() res: Response){
            try {
                const response = await this.bookService.findAll()
                return res.status(HttpStatus.CREATED).send(SuccessResponse("book added to shelf successfully", response))
            } catch (error) {
                Logger.error({error})
                return ErrorResponse(error)
            }
        };

        @Post("/add/books")
        async addBooks(@Body() createBooks:CreateBookDto, @Req() request: Request, @Res() res: Response){
            try {
                const handler = (request as any).user.id

                const response = await this.bookService.addBook(handler, createBooks)
                
                return res.status(HttpStatus.CREATED).send(SuccessResponse("book added to shelf successfully", response))
            } catch (error) {
                Logger.error({error})
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
        async deleteBook(@Param() id,@Req() req: Request, @Res() res: Response){
            try {
                const {id: handlerId} = (req as any).user.id
                await this.bookService.removeBook(id, handlerId)
                return res.status(HttpStatus.OK).send(SuccessResponse("Deleted succesfully", null))
            } catch (error) {
                Logger.error({error})
                return ErrorResponse(error)
            }
        }

        @Patch("/update/:id")
        async updateBook(@Param() id,@Req() req: Request, @Res() res: Response, @Body() updatebooks: CreateBookDto){
            try {
                await this.bookService.updateBook(id, updatebooks)

                return res.status(HttpStatus.OK).send(SuccessResponse("boon record updated successfully", null))
            } catch (error) {
                Logger.error({error})
                return ErrorResponse(error)
            }
        }
}
