import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Item, ItemSchema } from './item.schema'; // 스키마 파일 경로에 맞게 수정
import { BatchService } from './batch.service'; // BatchService 경로에 맞게 수정

@Module({
  imports: [
    ScheduleModule.forRoot(), // 스케줄 모듈 등록
    MongooseModule.forRoot('mongodb://mongo:27017/nest'), // MongoDB 연결 설정
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]), // 스키마 등록
  ],
  controllers: [AppController],
  providers: [AppService, BatchService],
})
export class AppModule {}
