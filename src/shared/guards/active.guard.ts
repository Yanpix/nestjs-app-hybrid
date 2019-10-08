import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthError } from '@exceptions';

@Injectable()
export class ActiveGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if(user.is_active == 1){
            return true;
        } else {
            throw new AuthError('Access denied! This user is disabled');
        }
    }
}