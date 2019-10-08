import { Module, NestModule, MiddlewareConsumer, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { DASHBOARD_CONTROLLERS } from './controllers';
import { ProfileService, MainService, SettingsService, ChubbService, FishService } from './services';
import { ErrorFilter } from '@filters';
import { SettingsRepository, ComissionsRepository, LocalisationRepository } from './repositories';
import { UserModule } from '../user/user.module';
import { AwsModule } from '../amazon-aws/aws.module';
import { PassUserMiddleware } from '@middlewares';
import { FileHelper } from './helpers';

@Global()
@Module({
    imports: [
        UserModule,
        AwsModule,
        TypeOrmModule.forFeature([
            SettingsRepository,
            ComissionsRepository,
            LocalisationRepository
        ]),
    ],
    controllers: [...DASHBOARD_CONTROLLERS],
    providers: [
        {
            provide: APP_FILTER,
            useClass: ErrorFilter,
        },
        ProfileService,
        MainService,
        FileHelper,
        SettingsService,
        ChubbService,
        FishService
    ],
    exports: [
        SettingsService,
        FishService
    ]
})
export class DashboardModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(PassUserMiddleware).forRoutes('*');
    }
}https://github.com/artem-sydorenko/nestjs-app-hybrid