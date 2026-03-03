import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Role } from 'src/user/role.entity';
import { User } from './user.entity';
import { Company } from 'src/company/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role, User, Company])],
    providers: [],
})
export class UserModuleModule {}
