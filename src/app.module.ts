import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/http-exceptions.filter';
import { AllExceptionsFilter } from './filter/all-exceptions.filter';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    // { // httpexception filter
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter
    // },
    { // all exception filter
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    // { // extends base exception filter
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter
    // },
    { // 인터셉터 전역으로 등록
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class AppModule {}
