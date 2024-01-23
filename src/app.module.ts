import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './common/guards/auth.guard';
import { ServerMonitorCronModule } from './crons/server-monitor/server-monitor-cron.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { NoteModule } from './modules/note/note.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES },
        }),
        ServerMonitorCronModule,
        PrismaModule,
        UserModule,
        NoteModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(userContext: MiddlewareConsumer) {
        userContext.apply(LoggerMiddleware).forRoutes('*');
    }
}
