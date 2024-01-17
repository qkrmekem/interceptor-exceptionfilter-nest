import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
    // 플랫폼에 종속적인 request와 response를 직접 사용하지 않고 httpAdapterHost를 활용
    // httpAdapter는 main.ts에서 생성되는 http
    constructor(private readonly httpAdapterHost: HttpAdapterHost){}

    catch(exception: unknown, host: ArgumentsHost) {
        // 특정 상황에서 httpAdapter가 생성자에서 사용할 수 없는 경우가 있다고 함
        // 따라서 여기서 꺼내 사용하라고 함(공식문서)
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus = 
        exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };

        // reply() : http응답을 보낼때 사용
        // reply(response객체, http payload, 상태값)
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }

}