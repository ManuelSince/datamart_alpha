import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { PrismaModule } from '../prisma.module';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bull';
import { EmailServeurService } from 'src/email-serveur/email-serveur.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.register(),
    BullModule.registerQueue({ name: 'supplier', redis: { port: 6380 } }),
    PrismaModule,
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService, EmailServeurService, ConfigService],
})
export class SuppliersModule {}
