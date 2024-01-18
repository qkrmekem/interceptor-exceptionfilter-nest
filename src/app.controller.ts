import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filter/http-exceptions.filter';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new HttpException(
      {status: 'Forbidden', error: 'This is a custom error'}, 
      HttpStatus.FORBIDDEN,
      {cause: new Error('custom error')});
  }

  @Get('bad')
  throwBad(){
    throw new BadRequestException('Someting bad happened', {cause: new Error(), description: 'Some custom error description'});
  }

  @Post()
  @UseFilters(HttpExceptionFilter)
  async create(@Body('str') str: string){
    console.log(`입력값 ${str}`);
    
    // throw new ForbiddenException();
  }
  
  @Get('intercept')
  // 메서드 단위 인터셉터
  // 클래스 단위, 전역 단위로 적용 가능
  @UseInterceptors(LoggingInterceptor)
  interceptorTest(){
    return 'test';
  }

  @Delete('/cron')
  deleteSchedule(){
    this.appService.deleteCron('testAddCron');
  }

  @Post('/cron')
  createCron(){
    this.appService.addCronJob('testAddCron', '*');
  }

  @Get('/cron')
  getCrons(){
    this.appService.getCrons();
  }
}
