import { Controller, ParseUUIDPipe, Get, Param, Post, Put, Delete, Body, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-orders.dto';
import { UpdateOrderDTO } from './dtos/update-orders.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get('/')
    getAll() {
        return this.ordersService.getAll();
    }

    @Get(':id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const order = await this.ordersService.getById(id);
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    @Post('/')
    create(@Body() orderData: CreateOrderDTO) {
        return this.ordersService.create(orderData);
    }

    @Put('/:id')
    async updateById(
        @Param('id', new ParseUUIDPipe()) id: string, 
        @Body() orderData: UpdateOrderDTO) {
        if (!await this.ordersService.getById(id)) 
            throw new NotFoundException('Order not found');
        
        await this.ordersService.updateById(id, orderData);
        return { success: true };
    }

    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!await this.ordersService.getById(id)) 
            throw new NotFoundException('Order not found');
        await this.ordersService.deleteById(id);
        return { success: true };
        
    }

}
