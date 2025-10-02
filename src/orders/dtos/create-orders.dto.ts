import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrderDTO {
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