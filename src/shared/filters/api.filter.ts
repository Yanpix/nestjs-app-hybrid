import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator/validation/ValidationError';

@Catch(HttpException)
export class ApiFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        let response = host.switchToHttp().getResponse();
        let request = host.switchToHttp().getRequest();

        if( exception instanceof HttpException ){
            let status = exception.getStatus();

            if (status === HttpStatus.UNAUTHORIZED){
                return response.status(status).json({ status: 'error', message: 'Unauthorized' });
            }
            if (status === HttpStatus.NOT_FOUND)
                return response.status(status).json({ status: 'error', message: 'Not found' });
            if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
                return response.status(status).json({ status: 'error', message: 'Iternal Server Error' });
            }
            if (status === HttpStatus.BAD_REQUEST){
                if(exception.message.message != undefined && exception.message.message[0] instanceof ValidationError){
                    return response.status(status).json({ status: 'error', message: exception.message.message[0].constraints });
                } else {
                    return response.status(status).json({ status: 'error', message: 'Bad Requets' });
                }
                
            }
        }
    }
}