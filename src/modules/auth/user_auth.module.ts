import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../../db/entities/user.entity';
import { UserAuthService } from './user_auth.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule { }
