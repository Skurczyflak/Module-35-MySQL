import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  client: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  address: string;
}