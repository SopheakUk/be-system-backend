import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Res() res: Response, @Body() loginDto: LoginDto) {
        const userToken = await this.userService.login(loginDto);

        res.cookie('token', userToken.data, {
            httpOnly: false, // prevents client-side JS access
            secure: false, // only over HTTPS
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return res.send(userToken);
    }
}
