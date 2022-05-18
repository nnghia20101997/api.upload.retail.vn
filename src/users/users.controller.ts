import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor() { }

    @Get()
    @UseGuards(JwtAuthGuard)
    getHello(
        @Request() req
    ): Object {
        return req.user
    }

}
