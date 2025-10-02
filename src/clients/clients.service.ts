import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/interceptors/services/prisma.service';
import { Client } from '@prisma/client';

@Injectable()
export class ClientsService {
    constructor(private prismaService: PrismaService) {}

    public getAll(): Promise<Client[]> {
        return this.prismaService.client.findMany();
    }

    public getAllExtended(): Promise<Client[]> {
        return this.prismaService.client.findMany({ include: { orders: true } });
    }

    public getByIdExtended(id: Client['id']): Promise<Client | null> {
        return this.prismaService.client.findUnique({
            where: { id },
            include: { orders: true },
        });
    }

    public getById(id: Client['id']): Promise<Client | null> {
        return this.prismaService.client.findUnique({
            where: { id },
        });
    }

    public create(clientData: Omit<Client, 'id'| 'createdAt'| 'updatedAt'>): Promise<Client> {
        return this.prismaService.client.create({
            data: clientData,
        });
    }

    public updateById(id: Client['id'], clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
        return this.prismaService.client.update({
            where: { id },
            data: clientData,
        });
    }

    public deleteById(id: Client['id']): Promise<Client> {
        return this.prismaService.client.delete({
            where: { id },
        });
    }
}
