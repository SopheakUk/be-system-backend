import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModuleModule } from './user/user.module';
import { SeederService } from './base/seeder.service';
import { Role } from './user/role.entity';
import { CompanyModuleModule } from './company/company.module';
import { Company } from './company/company.entity';

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
        TypeOrmModule.forFeature([Role, Company]),
        UserModuleModule,
        CompanyModuleModule,
    ],
    controllers: [AppController],
    providers: [AppService, SeederService],
})
export class AppModule {}
