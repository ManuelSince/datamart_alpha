import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from '../prisma.service';
import { Supplier, Prisma } from '@prisma/client';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { EmailServeur } from 'src/email-serveur/entities/email-serveur.entity';
import { EmailServeurService } from 'src/email-serveur/email-serveur.service';
import { generate_token } from 'tools/token';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class SuppliersService {
  constructor(
    @InjectQueue('supplier') private urlQueue: Queue,
    private configService: ConfigService,
    private prisma: PrismaService,
    private emailService: EmailServeurService,
  ) {}
  async create(createSupplierDto: CreateSupplierDto) {
    const { name, email } = createSupplierDto;
    return await this.prisma.supplier.create({ data: createSupplierDto });
  }
  async sendEmail(name, to) {
    return await this.emailService
      .sendMailSandBox({
        name,
        to,
        url_link: `${this.configService.get<String>('APP_HOST')}:${this.configService.get<Number>('APP_PORT')}/suppliers/informations?q=${generate_token(36)} `,
      })
      .catch((err) => console.log(err));
  }
  findAll() {
    return this.prisma.supplier.findMany();
  }

  findOne(id: number) {
    return this.prisma.supplier.findUnique({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.supplier.findMany({
      where: {
        email,
      },
    });
  }

  findByName(name: string) {
    return this.prisma.supplier.findMany({
      where: {
        name,
      },
    });
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return this.prisma.supplier.update({
      data: updateSupplierDto,
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
  removeToken(id: number) {
    return this.prisma.supplier.update({
      data: { token: null },
      where: {
        id,
      },
    });
  }
}
