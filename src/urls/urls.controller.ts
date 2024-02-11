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

@Controller('urls')
export class UrlsController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly urlsService: UrlsService,
  ) {}

  @Post()
  async create(@Body() createUrlDto: CreateUrlDto): Promise<Url> {
    const { url } = { ...createUrlDto };
    let data;
    if (this.cacheManager.get(url) != null) {
      console.log(`already in for : ${url} date of execution :` + ''); //this.cacheManager.Url.get(url).date,
      await job(url, 'single');
      return this.urlsService.create(createUrlDto);

      return this.findOneByUrl(url);
    } else {
      console.log('not in db');
      //SCRAPPING AND SHOT
      await job(url, 'single');
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
