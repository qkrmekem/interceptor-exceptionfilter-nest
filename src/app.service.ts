import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron'

@Injectable()
export class AppService {
  constructor(private schedulerRegistry: SchedulerRegistry){}

  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  // (초 분 시간 일 월 요일)
  @Cron('45 * * * * *')
  handleCron(){
    this.logger.debug('현재 시간이 45일 때마다 실행됨');
  }

  @Cron('10 * 14-15 * * 1-5')
  testCron(){
    this.logger.debug('월요일부터 금요일 오후2시 ~ 3시 사이 매분 10초마다 실행됨');
  }

  @Interval(30000)
  testInterval(){
    this.logger.warn('30초마다 실행');
  }

  // 지정된 시간이 지나면 해당 메서드 호출
  @Timeout(5000)
  handleTimeout(){
    this.logger.log('Called once after 5 seconds');
  }

  @Cron('* * * * * *',{
    name: 'testScheduler',
    timeZone: 'Asia/Seoul',
    // utcOffset: 시간 오프셋
    // disabled: 스케줄러 실행여부
  })
  testDynamic(){
    this.logger.log('스케줄러 동적 관리용 메서드');
  }

  addCronJob(name: string, seconds: string){
    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds} for job ${name} to run!)`);
    })

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(`${seconds}마다 실행되는 ${name} 작업이 추가됨`);
  }

  deleteCron(name: string){
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`${name} 작업이 제거되었습니다.`);
  }

  getCrons(){
    const crons = this.schedulerRegistry.getCronJobs();
    crons.forEach((value, key, map) => {
      console.log('value = ',value, ' key = ', key,' map = ', map);
      
    })
  }

  addInterval(name: string, milliseconds: number){
    const callBack = () => {
      this.logger.log(`인터벌 생성 ${name} ${milliseconds}`)
    }

    const interval = setInterval(callBack, milliseconds);
    this.schedulerRegistry.addInterval(name, interval);
  }

  deleteInterval(name: string){
    this.schedulerRegistry.deleteInterval(name);
    this.logger.warn(`interval ${name} deleted`);
  }

  getIntervals(){
    this.schedulerRegistry.getIntervals();
  }

  addTimeout(){
    const out = setTimeout(()=>{
      this.logger.log('test timeout');
    }, 1000)
    this.schedulerRegistry.addTimeout('test', out);
  }

  deleteTimeout(){
    this.schedulerRegistry.deleteTimeout('test');
  }

  getTimeout(){
    this.schedulerRegistry.getTimeouts();
  }

}
