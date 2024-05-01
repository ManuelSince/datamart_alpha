import { PartialType } from '@nestjs/swagger';
import { CreateEmailServeurDto } from './create-email-serveur.dto';

export class UpdateEmailServeurDto extends PartialType(CreateEmailServeurDto) {}
