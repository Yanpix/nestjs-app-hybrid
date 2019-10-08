import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { SystemErrorsService } from '../../modules/logger/services';
import { AuthError, ProfileError } from '@exceptions';


@Catch(HttpException, AuthError, ProfileError)
export class ErrorFilter implements ExceptionFilter {

    constructor(
        private readonly systemErrorsService: SystemErrorsService,
    ) { }

    catch(exception: HttpException | AuthError | ProfileError, host: ArgumentsHost) {
        let response = host.switchToHttp().getResponse();
        let request = host.switchToHttp().getRequest();

        if (exception instanceof HttpException) {
            let status = exception.getStatus();

            if (status === HttpStatus.UNAUTHORIZED)
                return response.status(status).render('auth/login');
            if (status === HttpStatus.FORBIDDEN)
                return response.status(status).render('admin/default', { user: request.user, error: '403 - No permissions' });
            if (status === HttpStatus.NOT_FOUND)
                if (request.isAuthenticated()) {
                    return response.status(status).render('admin/default', { user: request.user, error: '404 - Not found' });
                } else {
                    return response.render('auth/login');
                }
            if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
                let message = (exception.message && exception.message.message) ? exception.message.message : 'Internal Server Error';
                this.systemErrorsService.saveData({ message: message, stack: exception.stack })
                .then(() => {
                    return response.status(status).render('admin/default', { error: `500 - ${message}` });
                });
            }
        }

        if (exception instanceof AuthError) {
            return response.render('auth/login', { error: exception.message });
        }

        if (exception instanceof ProfileError) {
            return response.render('admin/profile', { user: request.user, error: exception.message });
        }

    }
}