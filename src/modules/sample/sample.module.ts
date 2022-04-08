import { Module } from '@nestjs/common';
import { AdminAuthModule } from '../auth/admin_auth.module';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';

@Module({
    imports: [AdminAuthModule],
    providers: [SampleService],
    controllers: [SampleController],
})
export class SampleModule { }
