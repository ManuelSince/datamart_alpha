import { ApiProperty } from '@nestjs/swagger';
export class CreateSupplierDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty()
  token?: string;
  // @ApiProperty({ required: false, default: '' })
  // img_url?: string;

  // @ApiProperty({ required: false, default: 0 })
  // isScrapped?: number;
}
