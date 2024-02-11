import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';
import { UrlsModule } from './urls/urls.module';
import config from './config/config';
import databaseConfig from './config/database.config';
import redisConfig from './config/cache.config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config, databaseConfig, redisConfig],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CacheModule.register(),
    BullModule.forRoot({
      redis: {
        host: redisConfig().redis_host,
        port: redisConfig().redis_port,
      },
    }),
    UrlsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
