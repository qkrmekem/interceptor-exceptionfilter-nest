import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

// http exception타입이 발생할 경우 작동
// ,를 이용해 여러 예외 타입을 지정할 수 있음
@Catch(HttpException) 
export class HttpExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        console.log('HttpExceptionFilter 실행됨 ', ctx.getRequest());
        

        response
            .status(status)
            // @nestjs/platform-fastify를 사용하는 경우 response.json() 대신 response.send()를 사용
            .json({ // json형태의 응답을 보내줌
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }

}