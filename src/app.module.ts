import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from 'nestjs-config';
import * as path from 'path';
import { AuthModule, DashboardModule } from './modules';
import { TypeOrmModule  } from '@nestjs/typeorm';


@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => config.get('database'),
            inject: [ConfigService],
        }),
        MongooseModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                uri: config.get('mongo.connectionString'),
                useNewUrlParser: true
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        DashboardModule,
        TemperModule,
        LoggerModule
    ],
})
export class AppModule {}
