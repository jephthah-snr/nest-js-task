import { Controller, Get, Injectable, Post } from "@nestjs/common";
import { AuthService } from "./auth.services";


@Controller("/test") @Injectable()
export class AuthController{
    constructor (private readonly authService:AuthService){}

    @Get("/signup")
    test() {
        return this.authService.signin();
    }

    @Post("/login")
    signin() {
        return this.authService.signup();
    }
}