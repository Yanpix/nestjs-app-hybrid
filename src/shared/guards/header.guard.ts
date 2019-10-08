import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const checkFrom = request.headers.origin;
        if(checkFrom != undefined && checkFrom.split('.').includes(ConfigService.get('settings.apiReqFrom'))){
            return true;
        } else {
            throw new UnauthorizedException();
        }
    }
}