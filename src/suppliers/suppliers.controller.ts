import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

import { generate_token } from '../../tools/token';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  async create(@Query() createSupplierDto: CreateSupplierDto) {
    const supplier = await this.suppliersService
      .create({
        ...createSupplierDto,
        token: generate_token(36),
      })
      .catch((err) => console.log(err.message));
    if (supplier) {
      await this.suppliersService.sendEmail(supplier.name, supplier.email);
    } else {
      console.log('failed to register the supplier');
    }
  }

  @Get('informations')
  informations(@Query() q: String) {
    console.log(q);
    return this.suppliersService.findAll();
  }

  @Get()
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(+id);
  }
}
