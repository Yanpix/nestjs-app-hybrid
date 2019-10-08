import 'reflect-metadata';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from 'nestjs-config';
import { join } from 'path';
import * as helmet from 'helmet';
import * as session from 'express-session';
import * as passport from 'passport';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
    app.use(helmet());
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('ejs');
    app.use(session({
        secret: ConfigService.get('settings.secret'),
        cookie: { _expires: ((12 * 60) * 60 * 1000) },
        saveUninitialized: false,
        resave: false,
    }));

    passport.serializeUser((user, done) => {
        done(null, user)
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj)
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(protectPath(/^\/protected\/.*$/));
    app.useStaticAssets(join(__dirname, '..', 'public'));

    const microservice = app.connectMicroservice({
        transport: Transport.TCP,
        options: { port: ConfigService.get('settings.microservicePort') }
    });
    await app.startAllMicroservicesAsync();

    await app.listen(ConfigService.get('settings.appPort'));

}
bootstrap();

const protectPath = function (regex) {
    return function (req, res, next) {
        if (!regex.test(req.url)) { return next(); }
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    };
};