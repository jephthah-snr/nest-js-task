import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../../typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserType } from '../../../utils/types';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findAllUsers(){
        try {
            const response = await this.userRepository.find()
            return response
        } catch (error) {
            throw error
        }
    }

    findSingleUser(){
        return "single user gotten"
    }


    async createUser(payload: CreateUserType){
        try {
            await this.userRepository.save(payload)
        } catch (error) {
            throw error
        }
    }

    async updateById(id: string, payload: CreateUserType){
        try {
            const data = await this.userRepository.update({id},{...payload})
        } catch (error) {
            throw error
        }
    }

    async deleteUser(id: string){
        try {
            await this.userRepository.delete(id)
        } catch (error) {
            throw error
        }
    }
}
