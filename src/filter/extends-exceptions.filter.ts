import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

// 기본 내장 exceptionfilter의 기능을 확장하고자 할 때
@Catch()
export class ExtendsExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        super.catch(exception,host);
    }
}