import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { UserToken } from './dto/user.token';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<UserToken> {
        return await this.userService.login(loginDto);
    }
}
