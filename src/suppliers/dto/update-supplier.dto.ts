import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateSupplierDto } from './create-supplier.dto';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
  @ApiProperty({ required: true })
  token: string;

  @ApiProperty({ required: true })
  address: string;

  @ApiProperty({ required: true })
  city: string;

  @ApiProperty({ required: true })
  zipcode: number;

  @ApiProperty({ required: true })
  rib_name: string;

  @ApiProperty({ required: true })
  rib: string;
}
