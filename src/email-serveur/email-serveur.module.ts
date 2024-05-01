import { Module } from '@nestjs/common';
import { EmailServeurService } from './email-serveur.service';
import { EmailServeurController } from './email-serveur.controller';

@Module({
  controllers: [EmailServeurController],
  providers: [EmailServeurService],
  exports: [EmailServeurService],
})
export class EmailServeurModule {}
