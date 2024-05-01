import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { UrlsModule } from './urls/urls.module';
import config from './config/config';
import databaseConfig from './config/database.config';
import cacheConfig from './config/cache.config';
import { join } from 'path';
import { SuppliersModule } from './suppliers/suppliers.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EmailServeurModule } from './email-serveur/email-serveur.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config, databaseConfig, cacheConfig],
      isGlobal: true,
    }),
    CacheModule.register(),
    BullModule.forRoot({
      redis: {
        host: cacheConfig().redis_host,
        port: cacheConfig().redis_port,
        password: cacheConfig().redis_pwd,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: String(process.env.MAIL_HOST),
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      template: {
        dir: __dirname + './template/notification',
        adapter: new PugAdapter({ inlineCssEnabled: true }),
        options: {
          strict: true,
        },
      },
    }),
    ScheduleModule.forRoot(),
    UrlsModule,
    SuppliersModule,
    EmailServeurModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
