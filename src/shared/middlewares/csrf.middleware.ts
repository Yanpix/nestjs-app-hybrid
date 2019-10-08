import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as csurf from 'csurf';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
    // tslint:disable-next-line:ban-types
    use(req: Request, res: Response, next: Function) {
        csurf({ cookie: true });
        next();
    }
}
