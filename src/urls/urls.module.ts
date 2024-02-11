import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { PrismaModule } from '../prisma.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register(), PrismaModule],
  controllers: [UrlsController],
  providers: [UrlsService],
})
export class UrlsModule {}
