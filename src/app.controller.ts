import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Item } from './item.schema';
import { BatchService } from './batch.service'; // BatchService 경로에 맞게 수정

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly batchService: BatchService) {}

  @Post('items')
  async createItem(
    @Body('name') name: string,
    @Body('description') description: string,
  ): Promise<Item> {
    return await this.appService.createItem(name, description);
  }


  // 10초 동안 작업을 처리하는 API
  @Get('long-task')
  async handleLongTask(): Promise<string> {
    return this.appService.longTask();
  }

  // 배치 작업 시작 API
  @Post('start-batch')
  startBatchJob(): string {
    return this.batchService.startBatchJob();
  }

  // 배치 작업 중지 API
  @Post('stop-batch')
  stopBatchJob(): string {
    return this.batchService.stopBatchJob();
  }

  // 배치 작업 상태 확인 API
  @Get('batch-status')
  getBatchStatus(): string {
    return this.batchService.isBatchRunning() ? 'Batch job is running' : 'Batch job is stopped';
  }
}
