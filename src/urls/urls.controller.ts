import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import job from './job';
import { BullModule } from '@nestjs/bull';

@Controller('urls')
export class UrlsController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly urlsService: UrlsService,
  ) {}

  @Post()
  async create(@Body() createUrlDto: CreateUrlDto): Promise<Url> {
    const { url } = { ...createUrlDto };
    let record = await this.urlsService.findOneByUrl(url);
    console.log(JSON.stringify(record));
    if (record != null) {
      return this.urlsService.findOneByUrl(url);
    } else {
      // BullModule.registerQueue({ name: url, redis: { port: 6380 } });
      console.log('not in db');
      //SCRAPPING AND SHOT
      return this.urlsService.create(createUrlDto);
    }
  }

  @Get()
  async findAll(): Promise<Url[]> {
    return this.urlsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Url> {
    return this.urlsService.findOne({ id: Number(id) });
  }

  @Get('check/:url')
  findOneByUrl(@Query('url') url: string): Promise<Url> {
    return this.urlsService.findOneByUrl(url);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlsService.update(+id, updateUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlsService.remove(+id);
  }
}
