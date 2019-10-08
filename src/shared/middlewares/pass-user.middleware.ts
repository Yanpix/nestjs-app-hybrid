import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PassUserMiddleware implements NestMiddleware {
    use(req, res, next: Function) {
        res.locals.user = req.user;
        next();
    }
}
