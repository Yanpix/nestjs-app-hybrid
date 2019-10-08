import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PassportAuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const req = context.switchToHttp().getRequest();

        if (!req.isAuthenticated()) {
            throw new UnauthorizedException();
        }

        return true;
    }
}