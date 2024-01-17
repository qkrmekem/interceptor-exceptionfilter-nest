import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exceptions.filter';
import { LoggingInterceptor } from './interceptor/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 전역 범위 필터 등록
  // 다만 이렇게 등록할 경우 게이트웨이나 하이브리드 어플리케이션에 대한 필터는 설정되지 않음
  // app.useGlobalFilters(new HttpExceptionFilter());
  // 전역 범위 인터셉터 등록
  // 모듈 외부에서 주입했으므로 종속성 주입이 불가능함
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
