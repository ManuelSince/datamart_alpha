import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { PrismaService } from '../prisma.service';
import { Url, Prisma } from '@prisma/client';

@Injectable()
export class UrlsService {
  constructor(private prisma: PrismaService) {}
  create(createUrlDto: CreateUrlDto): Promise<Url> {
    const something = { ...createUrlDto, img_url: '' };
    return this.prisma.url.create({ data: something });
  }

  findAll(): Promise<Url[]> {
    return this.prisma.url.findMany();
  }

  findOne(
    userWhereUniqueInput: Prisma.UrlWhereUniqueInput,
  ): Promise<Url | null> {
    return this.prisma.url.findUnique({
      where: userWhereUniqueInput,
    });
  }
  findOneByUrl(url: string): Promise<Url | null> {
    return this.prisma.url.findFirst({
      where: {
        url: url,
      },
    });
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
