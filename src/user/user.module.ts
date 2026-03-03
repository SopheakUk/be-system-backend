import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Role } from 'src/user/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [],
})
export class UserModuleModule {}
