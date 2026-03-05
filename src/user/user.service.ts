import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { verifyPassword } from 'src/base/password.generator';
import { UserJwtDto } from './dto/userJwt.dto';
import { UserToken } from './dto/user.token';

@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async login(loginDto: LoginDto): Promise<UserToken> {
        const user = await this.userRepository.findOne({
            where: { userName: loginDto.username },
        });
        if (!user) {
            throw new HttpException(
                'Username or pasword is not correct',
                HttpStatus.UNAUTHORIZED,
            );
        }

        if (
            (await verifyPassword(loginDto.password, user.passwordHash)) ===
            false
        ) {
            throw new HttpException(
                'Username or pasword is not correct',
                HttpStatus.UNAUTHORIZED,
            );
        }

        const payload: UserJwtDto = {
            username: user.userName,
            id: user.oid,
            role: user.permission,
        };

        const token: UserToken = {
            access_token: this.jwtService.sign(payload),
        };

        return token;
    }
}
