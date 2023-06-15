import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from '.././../../users/dtos/CreateUser.dto';
import { UsersService } from '../../../users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor (private readonly userService:UsersService){}
    @Get()
    async getUsers(){
        try {
            const users = await this.userService.findAllUsers()
            return {
                status: true,
                message: "All users returned",
                data: users
            }
        } catch (error) {
            throw error
        }
    }

    @Post("/create-user")
    async addUser(@Body() createUserDto: CreateUserDto){
        const response = await this.userService.createUser(createUserDto);
        delete (response as any).password
        return response
    }

    @Put(":id")
    async updateUser(@Param("id") id: string, @Body() updateParam: CreateUserDto) {
        try {
            const response = await this.userService.updateById(id, updateParam)
            return {
                status: true,
                message: "User data updated",
                data: response
            }
        } catch (error) {
            throw error
        }
    }

    @Delete("delete/:id")
    async deleteUser(@Param("id") id: string){
        try {
            const response = await this.userService.deleteUser(id)
            return {
                status: true,
                message:  null,
                data:  response
            }
        } catch (error) {
            
        }
    }
}
