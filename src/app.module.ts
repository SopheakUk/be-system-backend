import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModuleModule } from './user/user.module';
import { SeederService } from './base/seeder.service';
import { Role } from './user/role.entity';
import { CompanyModuleModule } from './company/company.module';
import { Company } from './company/company.entity';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '1234',
            database: 'be-system',
            autoLoadEntities: true,
            synchronize: true,
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV === 'production'
                    ? '.env.production'
                    : '.env.development',
        }),
        TypeOrmModule.forFeature([Role, Company, User]),
        UserModuleModule,
        CompanyModuleModule,
    ],
    controllers: [AppController],
    providers: [AppService, SeederService],
})
export class AppModule {}
