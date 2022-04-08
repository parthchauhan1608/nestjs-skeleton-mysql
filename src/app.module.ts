import { Module } from '@nestjs/common';
import SequelizeModule from '../db/entities';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleModule } from './modules/sample/sample.module';

@Module({
  imports: [SequelizeModule, SampleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
