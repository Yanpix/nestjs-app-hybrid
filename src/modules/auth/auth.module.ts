import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { authenticate } from 'passport';
import * as rateLimit from 'express-rate-limit';
import * as basicAuth from 'express-basic-auth';
import { LocalStrategySignIn, LocalStrategySignUp } from './passport/local.strategy';
import { CsrfMiddleware } from '@middlewares';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ErrorFilter } from '@filters';
import { AppConstants } from '@constants';

@Module({
    imports: [
        UserModule,
        PassportModule.register({}),
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ErrorFilter,
        },
        AuthService,
        LocalStrategySignIn,
        LocalStrategySignUp,
    ],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(rateLimit({ windowMs: 1 * 60 * 1000, max: 5 })).forRoutes({ path: 'auth/*', method: RequestMethod.POST });
        consumer.apply(authenticate('signup', { session: true, passReqToCallback: true })).forRoutes({ path: 'auth/register', method: RequestMethod.POST });
        consumer.apply(authenticate('signin', { session: true, passReqToCallback: true })).forRoutes({ path: 'auth/login', method: RequestMethod.POST });
        consumer.apply(CsrfMiddleware).forRoutes('auth');
        consumer.apply(basicAuth({
            challenge: true,
            users: { [AppConstants.basicAuth.username]: AppConstants.basicAuth.password },
        })).forRoutes('auth/api-doc');
    }
}
