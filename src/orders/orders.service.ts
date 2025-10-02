import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/interceptors/services/prisma.service';
import { Order } from '@prisma/client';
@Injectable()
export class OrdersService {
    constructor(private prismaService: PrismaService) {}
     public getAll(): Promise<Order[]> {
            return this.prismaService.order.findMany();
        }

    public getById(id: Order['id']): Promise<Order | null> {
        return this.prismaService.order.findUnique({
            where: { id },
        });
    }
    
   public create(productData: Omit<Order, 'id'| 'createdAt'| 'updatedAt'>): Promise<Order> {
        return this.prismaService.order.create({
            data: productData,
        });
    }

    public deleteById(id: Order['id']): Promise<Order> {
        return this.prismaService.order.delete({
            where: { id },
        });
    }

    public updateById(id: Order['id'],productData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    return this.prismaService.order.update({
        where: { id },
        data: productData,
    });
    }

}
