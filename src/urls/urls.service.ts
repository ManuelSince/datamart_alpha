import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { PrismaService } from '../prisma.service';
import { Url, Prisma } from '@prisma/client';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import job from './job';

@Injectable()
export class UrlsService {
  constructor(
    @InjectQueue('url') private urlQueue: Queue,
    private prisma: PrismaService,
  ) {}
  async create(createUrlDto: CreateUrlDto): Promise<Url> {
    const { url } = createUrlDto;

    const data = await job(url, 'singleShot');
    const something = {
      ...createUrlDto,
      date: new Date(),
      img_url: data.baseFilename,
      isScrapped: 1,
    };
    console.log(JSON.stringify(something));
    // this.urlQueue.add(job(url, 'singleShot'));
    // this.urlQueue.addListener('urlListener', () =>
    //   console.log('listener listen'),
    // );
    return this.prisma.url.findFirst({ where: { url: url } });
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
