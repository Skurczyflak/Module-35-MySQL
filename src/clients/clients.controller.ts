import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Put, Delete, NotFoundException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDTO } from './dtos/create-clients.dto';
import { UpdateClientDTO } from './dtos/update-clients.dto';

@Controller('clients')
export class ClientsController {
    constructor(private productsService: ClientsService) {}

    @Get('/')
    getAll() {
        return this.productsService.getAll();
    }

    @Get('/extended')
    getAllExtended() {
        return this.productsService.getAllExtended();
    }

    @Get('/extended/:id')
    async getByIdExtended(@Param('id', new ParseUUIDPipe()) id: string) {
        const prod = await this.productsService.getByIdExtended(id);
        if (!prod) throw new NotFoundException('Product not found');
        return prod;
    }

    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const prod = await this.productsService.getById(id);
        if (!prod) throw new NotFoundException('Product not found');
        return prod;
    }

    @Post('/')
    create(@Body() clientData: CreateClientDTO) {
        return this.productsService.create(clientData);
    }

    @Put('/:id')
    async updateById(@Param('id', new ParseUUIDPipe()) id: string, @Body() clientData: UpdateClientDTO) {
        if (!await this.productsService.getById(id)) 
            throw new NotFoundException('Client not found');
        await this.productsService.updateById(id, clientData);
        return { success: true };
    }

    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!await this.productsService.getById(id)) 
            throw new NotFoundException('Client not found');
        await this.productsService.deleteById(id);
        return { success: true };
    }

}
