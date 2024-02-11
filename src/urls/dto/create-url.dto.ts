import { ApiProperty } from '@nestjs/swagger';
export class CreateUrlDto {
  @ApiProperty({ required: true })
  url: string;

  @ApiProperty({ required: false })
  date?: string;

  @ApiProperty({ required: false, default: '' })
  img_url?: string;

  @ApiProperty({ required: false, default: 0 })
  isScrapped?: number;
}
