import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDTO {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
    address: string;
}