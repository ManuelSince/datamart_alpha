import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailServeurService } from './email-serveur.service';
import { CreateEmailServeurDto } from './dto/create-email-serveur.dto';
import { UpdateEmailServeurDto } from './dto/update-email-serveur.dto';

@Controller('email-serveur')
export class EmailServeurController {
  constructor(private readonly emailServeurService: EmailServeurService) {}

  @Post('test')
  create(@Body() createEmailServeurDto: CreateEmailServeurDto) {
    return this.emailServeurService.sendMailSandBox(createEmailServeurDto);
  }
}
