import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class TemperFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        let response = host.switchToHttp().getResponse();
        let request = host.switchToHttp().getRequest();

        if (exception instanceof HttpException) {
            let status = exception.getStatus();

            if (status === HttpStatus.NOT_FOUND) {
                return response.status(status).render('temper/error', { statusCode: status, message: 'This link is no longer valid' });
            } else if (status === HttpStatus.BAD_REQUEST) {
                let message = (exception.message != undefined) ? exception.message.message : exception.message.error;
                return response.status(status).render('temper/error', { statusCode: status, message: message });
            } else {
                return response.status(status).render('temper/error', { statusCode: status, message: exception.message.error });
            }

        }
    }
}