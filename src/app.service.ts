import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './item.schema'; // 스키마 파일 경로에 맞게 수정

@Injectable()
export class AppService {
  private batchInterval: NodeJS.Timeout | null = null; // 배치 작업을 위한 Interval 관리 변수

  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<Item>,
  ) {}

  getHello(): string {
    return 'Hello World!!!';
  }

  // 데이터 생성 메서드
  async createItem(name: string, description: string): Promise<Item> {
    const newItem = new this.itemModel({ name, description });
    return await newItem.save();
  }

  // 10초 동안 작업을 처리하면서 경과 시간을 출력하는 메서드
  async longTask(): Promise<string> {
    console.log('Task started...');

    let secondsElapsed = 0;

    // 1초마다 시간을 콘솔에 출력하는 Interval 설정
    const interval = setInterval(() => {
      secondsElapsed += 1;
      console.log(`Time elapsed: ${secondsElapsed} seconds`);
    }, 1000);

    // 10초 동안 대기하는 Promise
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // 10초 후 Interval 정지
    clearInterval(interval);

    console.log('Task completed after 10 seconds');
    return 'Task completed after 10 seconds';
  }

  // 배치 작업 시작
  startBatchJob(): string {
    if (this.batchInterval) {
      return 'Batch job is already running';
    }

    console.log('Batch job started');
    this.batchInterval = setInterval(() => {
      // 여기에 배치 작업 내용을 작성
      console.log('Batch job is running...');
    }, 1000); // 1초마다 실행

    return 'Batch job started';
  }

  // 배치 작업 중지
  stopBatchJob(): string {
    if (this.batchInterval) {
      clearInterval(this.batchInterval);
      this.batchInterval = null;
      console.log('Batch job stopped');
      return 'Batch job stopped';
    }

    return 'No batch job is running';
  }
}
