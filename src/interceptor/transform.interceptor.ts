import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

// express에서 제공하는 Response객체를 직접 다루는 것은 nestjs의 기본 전략에서는 허용되지 않으므로
// interface를 별도로 정의하여 사용해야 함
export interface Response<T>{
    data: T;
}

export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>>{
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
        return next.handle().pipe(map(data => ({data})));
    }

}