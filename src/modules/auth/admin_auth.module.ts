import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from '../../../db/entities/admin.entity';
import { AdminAuthService } from './admin_auth.service';

@Module({
    imports: [SequelizeModule.forFeature([Admin])],
    providers: [AdminAuthService],
    exports: [AdminAuthService],
})
export class AdminAuthModule { }
