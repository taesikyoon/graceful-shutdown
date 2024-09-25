import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);
  private isRunning = false; // 배치 작업 상태를 추적하는 변수

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  // 1초마다 실행되는 배치 작업
  @Cron(CronExpression.EVERY_SECOND, {
    name: 'batchJob', // 작업 이름을 지정하여 관리할 수 있습니다.
  })
  handleCron() {
    if (!this.isRunning) return; // 배치 작업이 중지되어 있다면 작업을 수행하지 않습니다.

    this.logger.log('Batch job is running...');
    // 여기에 배치 작업 로직을 추가할 수 있습니다.
  }

  // 배치 작업 시작
  startBatchJob(): string {
    if (this.isRunning) {
      return 'Batch job is already running';
    }

    this.isRunning = true;
    this.logger.log('Batch job started');
    return 'Batch job started';
  }

  // 배치 작업 중지
  stopBatchJob(): string {
    if (!this.isRunning) {
      return 'No batch job is running';
    }

    this.isRunning = false;
    this.logger.log('Batch job stopped');
    return 'Batch job stopped';
  }

  // 배치 작업 상태 확인
  isBatchRunning(): boolean {
    return this.isRunning;
  }
}
